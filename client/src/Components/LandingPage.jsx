import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import SelectRoom from './SelectRoom.jsx';
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authStatus: false
    }
  }

  async getAuthStatus() {
    return await axios.get('/api/authstatus')
      .then(async authStatus => {
        console.log('authstatus data: ', authStatus.data);
        localStorage.setItem('authenticated', authStatus.data);
        console.log('authstatus after adding to localstorage: ', localStorage.getItem('authenticated'));
        console.log('authstatus type in localstorage: ', typeof localStorage.getItem('authenticated'));
        this.setState({
          loading: false
        })
      });
  };

  componentDidMount() {
    this.getAuthStatus();
  }

  render() {
    console.log('render method authenticated: ', !!localStorage.getItem('authenticated'));
    console.log('render method auth type: ', typeof !!localStorage.getItem('authenticated'));
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    } else if (!this.state.loading && localStorage.getItem('authenticated') === 'true') {
      console.log('im going to ProtectedRoute');
      console.log('authentication: ', !!localStorage.getItem('authenticated'));
      //this.props.history.push('/selectroom');
      return (<ProtectedRoute component={SelectRoom} />);
    } else {
      return (
        <div>
          <h2> Welcome to the best collaborative coding environment EVER </h2>
          <Link to='/login'>Get started</Link>
        </div>
      );
    }
  }

}

export default withRouter(LandingPage);
