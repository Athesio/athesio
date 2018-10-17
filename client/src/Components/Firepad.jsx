import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';


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

    this.fireSetter = this.fireSetter.bind(this);
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

    firepad.on('synced', () => {
      this.setState({code: firepad.getText()});
    });


    this.setState({firepad: firepad});

    


  }

  fireSetter(text){
    this.state.firepad.setText(this.props.repoFirepadCode);
  }

  render() {
    if(this.props.repoFirepadCode){
      this.fireSetter();
    }
    return (
      <div>
        <div id='firepad-container'>
        </div>
        <div className="row" >
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9" id='runBtn'  >
          <Button style={{ marginRight: '10px'}} type="button" size="sm" onClick={() => this.props.toggleGistModal(this.state.code)} > Create Gist </Button>
          <Button type="button" size="sm" onClick={this.props.handleSaveClick}>Save Code</Button> 
        </div>
          <Button type="button" size="sm" color="warning"
            onClick={() => {
              axios.post('/api/run-code', { data: this.state.code })
                .then((response) => {
                  console.log(response);
                  console.log(typeof response);
                  this.props.runCode(response.data);
                }
              )}
            }>Run Code</Button>
            <button onClick={()=> {this.fireSetter()}}> Set me on Fire!! </button>
      </div>
      </div>
    );
  }

};

export default Firepad;
