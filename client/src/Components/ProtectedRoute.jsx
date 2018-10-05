import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  console.log('im in protected route mutha fuckaaa');
  return (
    <Route
      render={() => props.authStatus ?
        (<props.component authStatus={props.authStatus} />) : (<Redirect to='/login' />)
      }
    />
  );
};

export default ProtectedRoute;
