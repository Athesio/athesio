import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  console.log('im in protected route mutha fuckaaa --', props.authStatus);
  return (
    <Route
      render={() => props.authStatus || props.location.state.authStatus ?
        (<props.component authStatus={props.authStatus} />) : (<Redirect to='/login' />)
      }
    />
  );
};

export default ProtectedRoute;
