import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component }) => {
  axios.get('/api/authstate')
  .then(authState => {
    return (
      <Route
        render={() =>
          authState.data ? (
            <Component  />
          ) : (
            <Redirect to={{
                pathname: '/login'
              }}
            />
          )
        }
      />);
  });
};

export default ProtectedRoute;
