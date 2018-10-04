import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component }) => {
  return (
    <Route
      render={() =>
        false ? (
          <Component />
        ) : (
            <Redirect to='/login' />
          )
      }
    />);
  // // axios.get('/api/authstate')
  // // .then(authState => {
    
  // });
};

export default withRouter(ProtectedRoute);
