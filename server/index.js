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
const request = require('request');
const qs = require('querystring');

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
    username: login,
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

// import routes
const githubRoutes = require('./routes/github.js');

app.use('/api/github', githubRoutes);

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
  let { user, roomId } = req.body;
  delete roomInfo[roomId].users[user.login];
  roomInfo[roomId].userCount = Object.keys(roomInfo[roomId].users).length;
  if(roomInfo[roomId].userCount < 1) {
    axios.get('http://ec2-34-220-162-97.us-west-2.compute.amazonaws.com:3069/killcontainers')
    .then(response => console.log('attempt to kill containers'))
    .catch(err => console.log(err));
  }
  req.logout();
  res.redirect('/');
});

app.get('/api/retrieveRoomInfo', (req, res) => {
  let { id, login, avatar_url } = JSON.parse(req.session.passport.user._raw);
  res.send( { currentUser: { id, login, avatar_url }, roomInfo: roomInfo[req.query.roomId] } );
})

app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user:email', 'gist', 'repo']}), (req, res) => {}
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
      roomInfo[req.body.roomId].users[user.username] = user;
      roomInfo[req.body.roomId].userCount = Object.keys(roomInfo[req.body.roomId].users).length;
      res.send(roomInfo[req.body.roomId].ref);
    } else { // new room
      roomInfo[req.body.roomId] = {
        ref: response.data,
        userCount: 1,
        users: {
          [`${user.username}`] : user
        },
        workspace: {}
      };

      // MAKE CONTAINERS
      // axios.get('http://ec2-34-220-162-97.us-west-2.compute.amazonaws.com:3069/makecontainers')
      //   .then(response => console.log('attempt to create container'))
      //   .catch(err => console.log(err));
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
  console.log(req.body);
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
  let { id, login } = JSON.parse(req.session.passport.user._raw);
  db.getPreviousRoomsForUser(id, (err, history) => {
    if (err) {
      console.log('error retrieving previous rooms for user: ', err);
      res.sendStatus(500);
    } else {
      history = history.map((obj) => {
        obj.lastModifiedDate = moment(obj.lastModifiedDate).calendar();
        return obj;
      })
      
      res.send({history: history, user: login});
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
      res.send(response.data);
    }).catch((err) => {
      console.log('error from mother is', err);
    });
});

app.get('/api/github/repos', (req, res) => {
  let user = req.query.user;
  let userGithubAccessToken = users[user].accessToken;
  let url = 'https://api.github.com/user/repos';

  let query = { 
    access_token: userGithubAccessToken,
    affiliation: 'owner',
    sort: 'updated',
    direction: 'desc',
    visibility: 'public'
  };
  let repos = [];
  users[user].repos = {};

  request.get( { url:  url, qs: query, json:true, headers: { 'User-Agent': 'athesio' } }, (err, _, body) => {
    body.forEach(repo => {
      let { name, html_url, git_url, description, language } = repo;
      if (language && language.toLowerCase() === 'javascript') {
        description = description === null ? '' : description;
        let repoObj = { name: name, url: html_url, git_url: git_url, description: description, language: language };
        users[user]['repos'][name] = repoObj;
        repos.push(repoObj);
      }
    });

    res.send(repos);
  });
});

app.get('/api/openRepo', (req, res) => {
  let { username, repoName, roomId } = req.query;
  let git_url = users[username]['repos'][repoName].git_url;

  axios.post(`${process.env.GITHUB_SERVICE_URL}/api/github/clonerepo/`, { username: username, repoName: repoName, gitUrl: git_url })
    .then(({ data }) => {
      data.fileDirectory = JSON.parse(data.fileDirectory);
      
      roomInfo[roomId].workspace['fileStructure'] = data.fileDirectory['repos'][username];
      roomInfo[roomId].workspace['fileArray'] = data.fileArray;
      // store empty objects to hold file contents once loading starts
      roomInfo[roomId].workspace['fileContents'] = {};
      data.fileArray.forEach(file => {
        roomInfo[roomId].workspace['fileContents'][file] = {
          loaded: false,
          contents: '',
          refId: null
        }
      });

      res.send(data.fileDirectory['repos'][username]);
    })
    .catch(console.log);
});

app.post('/api/saveNewGist', (req, res) => {
  let { description, fileName, content, username } = req.body;
  let userGithubAccessToken = users[username].accessToken;
  console.log(req.body);
  axios.post(`${process.env.GITHUB_SERVICE_URL}/api/github/gists/create`, { accessToken: userGithubAccessToken, description: description, fileName: fileName, content: content })
    .then(results => {
      res.sendStatus(200);
    })
    .catch(console.log);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

const loadFileContents = (repoName, username, roomId) => {
  let repoFileArray = roomInfo[roomId].workspace['fileArray'];

  repoFileArray.forEach(file => {
    tempFileName = './' + file;
    axios.get(`${process.env.GITHUB_SERVICE_URL}/api/github/repo/contents/get`, { params: { filePath: tempFileName, username: username, repoName: repoName }})
      .then(({ data }) => {
        axios.get(process.env.RANDOM_ID_URL)
          .then((refId) => {
            roomInfo[roomId].workspace['fileContents'][file]['contents'] = data;
            roomInfo[roomId].workspace['fileContents'][file]['loaded'] = true;
            roomInfo[roomId].workspace['fileContents'][file]['refId'] = refId.data
          });
      })
      .catch(console.log);
  });
};

let nsp = io.of('/athesio');
nsp.on('connection', (socket) => {
  socket.on('room', (room) => {
    socket.join(room);
    // if(roomInfo[room] !== undefined){
    //   if (Object.keys(roomInfo[room]['users']).length > 1) {
    //     console.log(roomInfo[room].users);
    //     socket.broadcast.emit('sendUpdateOnRoom', roomInfo[room].users);
    //   }
    // }
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

  socket.on('image', (data) => {
    console.log(data);
    socket.emit('updatedImage', data);
  })
  socket.on('beginLoadingRepoContents', ({ repoName, username, roomId }) => {
    loadFileContents(repoName, username, roomId);
  });

  socket.on('updateRoomUsers', (roomId) => {
    let roomUsers = [];
    Object.keys(roomInfo[roomId]['users']).forEach(user => roomUsers.push(roomInfo[roomId]['users'][user]));
    socket.broadcast.emit('sendUpdatedRoomInfo', roomUsers);
  });
  socket.on('updateRoomUsers', (roomId) => {
    // console.log(roomInfo[roomId]['users']);
    let roomUsers = [];
    Object.keys(roomInfo[roomId]['users']).forEach(user => roomUsers.push(roomInfo[roomId]['users'][user]));
    socket.broadcast.emit('sendUpdatedRoomInfo', roomUsers);
  });


  socket.on('disconnect', () => console.log('disconnecting client'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
