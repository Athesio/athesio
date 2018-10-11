require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const axios = require('axios');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const db = require('../database/index.js');
const moment = require('moment');

const roomInfo = {
  
};

const users = {
  
};

const chatHistory = {

}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const persistGithubUser = (accessToken, profile, done) => {
  // save accessToken, login, and id in DB
  let { login, id } = profile._json;

  users[login] = {
    accessToken: accessToken,
    githubId: id
  };
  
  done(null, profile);
};

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
  }, (accessToken, refreshToken, profile, done) => {
    persistGithubUser(accessToken, profile, done);
  }
));

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(session({ secret: 'top secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const isAuthenticated = (req, res, next) => {
  if (req.session.passport) {
    let { id } = JSON.parse(req.session.passport.user._raw);

    if (users[id]) {
      return next();
    }
  }
  res.redirect('/');
};

app.get('/', isAuthenticated, (req, res) => {
  //app.use(express.static(__dirname + '/../client/dist'));
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.post('/api/logout', (req, res) => {
  // remove from users
  let { user, roomId } = req.body;
  roomInfo[roomId].userCount -= 1;
  req.logout();
  res.redirect('/');
});

app.get('/api/retrieveRoomInfo', (req, res) => {
  let { id, login, avatar_url } = JSON.parse(req.session.passport.user._raw);
  res.send( { currentUser: { id, login, avatar_url }, roomInfo: roomInfo[req.query.roomId] } );
})

app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user:email']}), (req, res) => {}
);

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/');
  }
);

app.get('/api/roomId', (req, res) => {
  res.send(uuidv1().slice(0,14).split('-').join(''));
});

app.post('/api/enterroom', (req, res) => {
  axios.get(process.env.RANDOM_ID_URL)
  .then((response) => {
    let { login, id, avatar_url } = JSON.parse(req.session.passport.user._raw);

    let user = {
      username: login,
      id: id,
      avatar_url: avatar_url
    };

    // existing room
    if (roomInfo[req.body.roomId]) {
      roomInfo[req.body.roomId].userCount += 1;
      roomInfo[req.body.roomId].users[user.username] = user;
      console.log(roomInfo);
      res.send(roomInfo[req.body.roomId].ref);
    } else { // new room
      roomInfo[req.body.roomId] = {
        ref: response.data,
        userCount: 1,
        users: {
          [`${user.username}`] : user
        }
      };
      res.send(response.data);
    }

  })
  .catch(console.log);
});

app.get('/api/validateRoomId', (req, res) => {
  roomInfo[req.query.roomId] ? res.send({ isValid: true }) : res.send({ isValid: false });
});

app.get('/api/authstatus', (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post('/api/saveroom', (req, res) => {

  db.saveRoomInfoForUser(req.body, (err, results) => {
    if (err) {
      console.log('Error saving room info to DB: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/room/*', (req, res) => {
  res.redirect('/');
});

app.get('/api/getPreviousRoomsForUser', (req, res) => {
  let { id } = JSON.parse(req.session.passport.user._raw);
  db.getPreviousRoomsForUser(id, (err, history) => {
    if (err) {
      console.log('error retrieving previous rooms for user: ', err);
      res.sendStatus(500);
    } else {
      history = history.map((obj) => {
        obj.lastModifiedDate = moment(obj.lastModifiedDate).calendar();
        return obj;
      })
      res.send(history);
    }
  });
});

app.post('/api/run-code', (req, res) => {
  axios.post('http://ec2-34-220-162-97.us-west-2.compute.amazonaws.com:3069', req.body.data, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    .then(response => {
      console.log('response from utility mother', response.data);
      res.send(response.data);
    }).catch((err) => {
      console.log('error from mother is', err);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

let code = '';

let nsp = io.of('/athesio');
nsp.on('connection', (socket) => {
  socket.on('room', (room) => {
    socket.join(room);
  });

  socket.on('retrieveChatHistory', (room) => {
    socket.emit('receivedChatHistoryFromServer', chatHistory[room] ? chatHistory[room] : []);
  });

  socket.on('newMessage', (messageObj) => {
    chatHistory[messageObj.roomId] ? chatHistory[messageObj.roomId].push(messageObj) : chatHistory[messageObj.roomId] = [messageObj];
    socket.broadcast.to(messageObj.roomId).emit('newMessageFromServer', messageObj);
  });
  socket.on('codeSent', (code) => {
    console.log('from socket', code);
    socket.emit('codeUpdated', code);
  });

  socket.on('disconnect', () => console.log('disconnecting client'));
});

// io.on('connection', (socket) => {
//   io.emit('newClientConnection', code);

//   socket.on('clientUpdateCode', (newCode) => {
//     code = newCode;
//     io.emit('serverUpdateCode', code);
//   });

//   socket.on('disconnect', () => console.log('Client disconnected'));


// });



const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
