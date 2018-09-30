import React, { Component } from 'react';

class Firepad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyAxYw8yYf8KtAqcLdi97MnZWVdFQQzcivY",
      authDomain: "athesio-66b77.firebaseapp.com",
      databaseURL: "https://athesio-66b77.firebaseio.com",
      projectId: "athesio-66b77",
      storageBucket: "athesio-66b77.appspot.com",
      messagingSenderId: "481686922961"
    };

    window.firebase.initializeApp(config);
    var firepadRef = firebase.database().ref();
    var editor = window.ace.edit('firepad-container');
    var firepad = window.Firepad.fromACE(firepadRef, editor, { userColor: 'white' });
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
