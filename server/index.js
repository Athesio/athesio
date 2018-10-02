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
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
  }, 
  function(accessToken, refreshToken, profile, done){
  return done(null, profile);
  }
))

app.use(cors());
app.use(session({secret: 'top secret key', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};


app.get('/', isAuthenticated, function(req, res){
  console.log(JSON.parse(req.session.passport.user._raw).login)
  app.use(express.static(__dirname + '/../client/dist'));
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, '../client/dist/login.html'));
});

app.get('/logout', function(req, res){
  req.logout();
  res.sendFile(path.join(__dirname, '../client/dist/login.html'));
});


app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user:email']}),
  function(req, res){
    console.log(res);
  }
);

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: '/login'}),
  function(req, res){
    res.redirect('/');
  }
);

let code = '';

app.get('/api/refId', (req, res)=>{
  axios.get(process.env.RANDOM_ID_URL).then((response)=>{
    console.log(response.data);
    res.send(response.data);
  })
})

io.on('connection', (socket) => {
  console.log('New client connected: ', socket.id);

  io.emit('newClientConnection', code);

  socket.on('clientUpdateCode', (newCode) => {
    code = newCode;
    console.log('updated to: ', code);
    io.emit('serverUpdateCode', code);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
