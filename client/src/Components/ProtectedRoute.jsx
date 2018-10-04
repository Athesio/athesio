import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authstate: false
    }
    //let authstate = this.getAuthState();
  }

  async getAuthState() {
    return await axios.get('/api/authstate')
      .then(authState => {
        return authState.data
      });
  };

  componentDidMount() {
    this.setState({ authstate: this.getAuthState() });
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

// const ProtectedRoute = async ({ component: Component }) => {
//   let authstate = await getAuthState();
//   console.log('auth state: ', authstate);
  
// };

export default withRouter(ProtectedRoute);
