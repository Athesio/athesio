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

const roomInfo = {
  
};

const users = {

};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const persistGithubUser = (accessToken, profile, done) => {
  // save accessToken, login, and id in DB
  let { login, id } = profile._json;

  users[id] = {
    accessToken: accessToken,
    username: login
  };
  
  done(null, profile);
};

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
  }, (accessToken, refreshToken, profile, done) => {
    persistGithubUser(accessToken, profile, done);
    //done(null, profile);
  }
));

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(session({ secret: 'top secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// const isAuthenticated = (req, res, next) => {
//   if(req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };

const isAuthenticated = (req, res, next) => {
  if (req.session.passport) {
    let { id } = JSON.parse(req.session.passport.user._raw);

    if (users[id]) {
      return next();
    }
  }
  res.redirect('/login');
};

app.get('/', isAuthenticated, (req, res) => {
  //app.use(express.static(__dirname + '/../client/dist'));
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// app.get('/login', (req, res) => {
  
// });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
  //res.sendFile(path.join(__dirname, '../client/dist/login.html'));
});

app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user:email']}), (req, res) => {
    console.log('/auth/github res: ', res);
  }
);

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/selectroom');
  }
);

app.get('/api/roomId', (req, res) => {
  res.send(uuidv1().substr(0, 8));
});

app.post('/api/enterroom', (req, res) => {
  console.log('in enter room: ', req.body.roomId);
  axios.get(process.env.RANDOM_ID_URL)
  .then((response) => {
    let { login, id } = JSON.parse(req.session.passport.user._raw);

    console.log('refId: ', response.data);
    console.log('roomId: ', req.body.roomId);
    console.log('user: ', login, id);

    let user = {
      username: login,
      id: id
    };

    // existing room
    if (roomInfo[req.body.roomId]) {
      roomInfo[req.roomId].userCount += 1;
      roomInfo[req.roomId].users[user.id] = user.username;

      console.log('users: ', roomInfo);
      res.send(roomInfo[req.roomId].ref);
    } else { // new room
      roomInfo[req.body.roomId] = {
        ref: response.data,
        userCount: 1,
        users: {
          [`${id}`]: user.username
        }
      };

      console.log('users: ', roomInfo);
      res.send(response.data);
    }

  })
  .catch((err) => console.log(err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});


let code = '';

io.on('connection', (socket) => {
  io.emit('newClientConnection', code);

  socket.on('clientUpdateCode', (newCode) => {
    code = newCode;
    io.emit('serverUpdateCode', code);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
