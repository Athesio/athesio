import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Editor from './Components/Editor.jsx';
import io from "socket.io-client";
import Firepad from './Components/Firepad.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };

    this.socket = io.connect();

    this.socket.on('connect', () => {
      console.log('connection made client side');
    });

    this.socket.on('newClientConnection', (code) => {
      this.setState({ code: code });
    });

    this.socket.on('serverUpdateCode', (newCode) => {
      console.log('im changing state: ', newCode);
      this.setState({ code: newCode });
    });

    this.onCodeUpdate = this.onCodeUpdate.bind(this);
  }

  onCodeUpdate(newCode, e) {
    console.log('newCode: ', newCode);
    this.setState({ code: newCode }, () => {
      this.socket.emit('clientUpdateCode', newCode);
    });
  }

  render() {
    return (
      <div>
        <div className='editor-container'>
          {/* <Editor
            onCodeUpdate={this.onCodeUpdate}
            code={this.state.code}
          /> */}
          <Firepad />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
