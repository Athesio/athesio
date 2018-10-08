import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

    this.onCodeUpdate = this.onCodeUpdate.bind(this);
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

  render() {
    return (
      <div id="application" >
        <Switch>
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/login' component={Login} />
          {/* <Route exact path='/selectroom' component={SelectRoom} />
          <Route path='/room/:id' component={Room} /> */}
          <ProtectedRoute path='/room/:id' component={Room} />
          <ProtectedRoute path='/room/*' component={Room} />
          <ProtectedRoute path='/selectroom' component={SelectRoom} />
          <Route path='/' component={LandingPage} />
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
