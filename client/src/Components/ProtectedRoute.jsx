import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => (
  <Route
    render={() => props.authStatus ?
      (<props.component authStatus={props.authStatus}/>) : (<Redirect to='/login' />)
    }
  />
);

export default ProtectedRoute;
