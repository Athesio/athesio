import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

var firepad;
var firepadRef;
var editor;

class Firepad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.roomId,
      refId: this.props.refId,
      code: "",
      firepad: '',
      repoFirepadCode: this.props.repoFirepadCode
    };

    // let lastFileEdited = null;

    // props.socket.on('toFirepadChangeFile', (changeFileInfo) => {
    //   // take this stuff, add currentContents and send off to server
    //   if (lastFileEdited === null) {
    //     lastFileEdited = changeFileInfo.filePath;
    //     props.socket.emit('toServerChangeFile', changeFileInfo);
    //   } else { // already clicked on at least 1 file
    //     changeFileInfo['prevFile'] = { filePath: lastFileEdited, contents: firepad.getText() };
    //     props.socket.emit('updateFileContentsInServerMemory', changeFileInfo);
    //     let lastFileEdited = changeFileInfo.filePath;
    //     props.socket.emit('toServerChangeFile', changeFileInfo);
    //   }
    // });

    this.props.socket.on('fromServerChangeFile', (changeFileInfo) => {
      // axios.post('/api/updateFileContents', { roomId: this.props.roomId, filePath: changeFileInfo.path, newContents: this.state.code })
      //   .then(() => {
          
      //   });
      if (changeFileInfo.user.login === this.props.user.login) {
        firepadRef = window.firebase.database().ref(changeFileInfo.fileObj.refId);
        // firepad = window.Firepad.fromACE(firepadRef, editor);
        firepad.setText(changeFileInfo.fileObj.contents);
        // firepad.on('ready', () => {
        // })
      }
    });
  }

  componentDidMount() {
    const config = {
      apiKey: '',
      authDomain: 'athesio-66b77.firebaseapp.com',
      databaseURL: 'https://athesio-66b77.firebaseio.com'
    };
    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(config);
    }
    firepadRef = firebase.database().ref(this.props.refId);
    // create Ace editor and config
    editor = ace.edit('firepad-container');
    editor.setTheme('ace/theme/tomorrow_night');
    editor.$blockScrolling = 1;

    let session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setTabSize(2);
    session.setMode('ace/mode/javascript');

    firepad = window.Firepad.fromACE(firepadRef, editor);
    
    // firepad.on('ready', () => {
    //   this.setState({ code: firepad.getText() });
    // });

    firepad.on('synced', () => {
      this.setState({ code: firepad.getText() });
    });
  }

  render() {
    return (
      <div>
        <div id='firepad-container'>
        </div>
        {this.props.githubMode ? 
        <div className='EditorButtonDiv' >
          <Button type="button" size="sm" color="warning" >Save Code</Button> 
        </div>
        :
        <div className='EditorButtonDiv' >
          <Button type="button" size="sm" onClick={() => this.props.toggleGistModal(this.state.code)} > Create Gist </Button>
          <Button type="button" size="sm" onClick={this.props.handleSaveClick}>Save Code</Button> 
          <Button type="button" size="sm" color="warning" id="runCodeBtn"
            onClick={() => {
              axios.post('/api/run-code', { data: this.state.code })
                .then((response) => {
                  this.props.runCode(response.data);
                }
              )}
            }>Run Code</Button>
      </div>
        }
      </div>
    );
  }
};

export default Firepad;
