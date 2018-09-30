import React, { Component } from 'react';

class FirepadAce extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const config = {
      apiKey: '',
      authDomain: 'athesio-66b77.firebaseapp.com',
      databaseURL: 'https://athesio-66b77.firebaseio.com'
    };

    window.firebase.initializeApp(config);
    //// Get Firebase Database reference.
    let firepadRef = firebase.database().ref();
    //// Create ACE
    let editor = ace.edit("firepad-container");
    editor.setTheme("ace/theme/tomorrow_night");
    editor.$blockScrolling = 1;
    let session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setTabSize(2);
    session.setMode("ace/mode/javascript");

    let firepad = window.Firepad.fromACE(firepadRef, editor, {
      defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
    });
  }

  render() {
    return (
      <div>
        <h2>
          Firepad!!!
        </h2>
        <div id='firepad-container'>
        </div>
      </div>
    );
  }

};

export default FirepadAce;
