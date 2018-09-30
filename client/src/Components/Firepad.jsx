import React, { Component } from 'react';
import '../../dist/darcula.css';

class Firepad extends Component {
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

    let firepadRef = firebase.database().ref();
    
    let codeMirror = window.CodeMirror(document.getElementById('firepad-container'), 
      { lineNumbers: true, mode: {name: 'javascript', json: true }, theme: 'darcula', tabSize: 2 });

    let firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror);
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

export default Firepad;
