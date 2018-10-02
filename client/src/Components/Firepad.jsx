import React, { Component } from 'react';

class Firepad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getRandomID() {
    let alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = [1, 2, 3, 4, 5].reduce((a, c) => {
      a += alpha.substr(Math.floor(Math.random() * Math.floor(52)), 1);
      return a;
    }, '');

    return result;
  }


  componentDidMount() {
    const config = {
      apiKey: '',
      authDomain: 'athesio-66b77.firebaseapp.com',
      databaseURL: 'https://athesio-66b77.firebaseio.com'
    };

    window.firebase.initializeApp(config);
    let firepadRef = firebase.database().ref(this.getRandomID());
    
    // create Ace editor and config
    let editor = ace.edit("firepad-container");
    editor.setTheme("ace/theme/tomorrow_night");
    editor.$blockScrolling = 1;
    
    let session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setTabSize(2);
    session.setMode("ace/mode/javascript");

    let firepad = window.Firepad.fromACE(firepadRef, editor, {
      defaultText: 'console.log("hello world");'
    });
  }

  render() {
    return (
      <div>
        <div id='firepad-container'>
        </div>
      </div>
    );
  }

};

export default Firepad;
