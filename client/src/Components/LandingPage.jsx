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
        localStorage.setItem('authenticated', authStatus.data);
        this.setState({
          loading: false
        })
      });
  };

  componentDidMount() {
    this.getAuthStatus();
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    } else if (!this.state.loading && localStorage.getItem('authenticated')) {
      console.log('im going to ProtectedRoute');
      console.log('authentication: ', localStorage.getItem('authenticated'));
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
