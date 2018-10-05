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
    console.log('calling getAuthStatus')
    return await axios.get('/api/authstatus')
      .then(async authStatus => {
        localStorage.setItem('authenticated', authStatus.data);
        this.setState({
          authStatus: authStatus.data,
          loading: false
        })
      });
  };

  componentDidMount() {
    this.getAuthStatus();
  }

  render() {
    console.log('state in landing page: ', this.state);
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    } else if (!this.state.loading && this.state.authStatus) {
      console.log('im going to ProtectedRoute');
      this.props.history.push('/selectroom');
      //return (<ProtectedRoute component={SelectRoom} authStatus={this.state.authStatus} />);
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
