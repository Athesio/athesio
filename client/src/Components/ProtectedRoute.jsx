import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  return (
    <Route
      render={() => localStorage.getItem('authenticated') === 'true' ?
        (<props.component />) : (<Redirect to='/login' />)
      }
    />
  );
};

export default ProtectedRoute;
