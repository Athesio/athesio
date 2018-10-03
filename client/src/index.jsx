import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import SelectRoom from './Components/SelectRoom.jsx';
import Room from './Components/Room.jsx';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router';
import Login from './Components/Login.jsx';
import Logout from './Components/Logout.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      currScreen: 'SelectRoom',
      userData: {
        username: 'Darth Maul-ineisha',
        img: 'https://vignette.wikia.nocookie.net/starwars/images/5/50/Darth_Maul_profile.png/revision/latest?cb=20140209162228'
      },
      githubData: {
        Organization: '',
        Repos: [] 
      },
      roomId: ''
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
    this.passRoomId = this.passRoomId.bind(this);
    this.changeScreens = this.changeScreens.bind(this);
  }

  onCodeUpdate(newCode, e) {
    console.log('newCode: ', newCode);
    this.setState({ code: newCode }, () => {
      this.socket.emit('clientUpdateCode', newCode);
    });
  }
  changeScreens() {
    this.state.currScreen === 'SelectRoom' ? this.setState({currScreen: 'Room'}) : this.setState({currScreen: 'SelectRoom'})
  }

  passRoomId(roomId) {
    console.log('roomId iin passRoomId: ', roomId);
    this.setState({roomId: roomId})
  }

  render() {
    return (
      // <div>
      //   <Switch>
      //     <Route exact path='/logout' component={Logout} />
      //     <Route exact path='/login' component={Login} />
      //     <Route exact path='/selectroom' component={SelectRoom} />
      //     <Route exact path='/room/:id' component={Room} />
      //     <Redirect exact path='/' />
      //   </Switch>
      // </div>

      <div>
        <a href="/logout">Logout</a>
        {this.state.currScreen === 'Room' ? 
        <Room  
          onCodeUpdate={this.onCodeUpdate} 
          code={this.state.code} 
          user={this.state.userData} 
          roomId={this.state.roomId}
        />
        : 
        <SelectRoom changeScreens={this.changeScreens} passRoomId={this.passRoomId} /> 
        }
      </div>
    );
  }
}

ReactDOM.render(
  // <BrowserRouter>
    <App />
  // </BrowserRouter>
  , document.getElementById('app'));
