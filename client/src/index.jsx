import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import SelectRoom from './Components/SelectRoom.jsx';
import Room from './Components/Room.jsx';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Login.jsx';
import Logout from './Components/Logout.jsx';
import LandingPage from './Components/LandingPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
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
    console.log('roomId in passRoomId: ', roomId);
    this.setState({roomId: roomId})
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/login' component={Login} />
          {/* <Route exact path='/selectroom' component={SelectRoom} />
          <Route path='/room/:id' component={Room} /> */}
          <ProtectedRoute path='/room/:id' component={Room} />
          <ProtectedRoute path='/room/*' component={Room} />
          <ProtectedRoute path='/selectroom' component={SelectRoom} />
          <Route exact path='/' component={LandingPage} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render((
<BrowserRouter>
  <App />
</BrowserRouter>), document.getElementById('app'));
