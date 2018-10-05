import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authstate: null
    }
  }

  async getAuthState() {
    return await axios.get('/api/authstate')
      .then(authState => {
        console.log('front end authentication state: ', authState.data);
        return authState.data;
      });
  };
  componentDidMount() {
    this.setState({
      authstate: this.getAuthState()
    });
  }

  render() {
    return (
      <Route
        render={() =>
          this.state.authstate ? (
            <Component />
          ) : (
              <Redirect to='/login' />
            )
        }
      />);
  }
}

export default withRouter(ProtectedRoute);
