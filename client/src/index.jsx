import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import Midway from './Components/Midway.jsx';
import Dashboard from './Components/EditorDash.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      currScreen: 'Midway',
      userData: {
        username: 'Darth Maul-ineisha',
        img: 'https://vignette.wikia.nocookie.net/starwars/images/5/50/Darth_Maul_profile.png/revision/latest?cb=20140209162228'
      },
      githubData: {
        Organization: '',
        Repos: [] 
      }
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
  changeScreens() {
    this.state.currScreen === 'Midway' ? this.setState({currScreen: 'Dashboard'}) : this.setState({currScreen: 'Midway'})
  }

  render() {
    return (
      <div>
        <a href="/logout">Logout</a>
        {this.state.currScreen === 'Dashboard' ? 
        <Dashboard  
          onCodeUpdate={this.onCodeUpdate.bind(this)} 
          code={this.state.code} 
          user={this.state.userData} 
        />
        : 
        <Midway changeScreens={this.changeScreens.bind(this)} /> 
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
