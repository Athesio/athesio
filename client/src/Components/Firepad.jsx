import React, { Component } from 'react';
import axios from 'axios';

class Firepad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.roomId,
      refId: this.props.refId
    };
  }

  componentDidMount() {
    const config = {
      apiKey: '',
      authDomain: 'athesio-66b77.firebaseapp.com',
      databaseURL: 'https://athesio-66b77.firebaseio.com'
    };
    window.firebase.initializeApp(config);
    let firepadRef = firebase.database().ref(this.state.refId);
    // create Ace editor and config
    let editor = ace.edit('firepad-container');
    editor.setTheme('ace/theme/tomorrow_night');
    editor.$blockScrolling = 1;

    let session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setTabSize(2);
    session.setMode('ace/mode/javascript');

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
