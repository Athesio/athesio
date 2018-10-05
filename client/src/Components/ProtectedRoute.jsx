import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  console.log('im in protected route mutha fuckaaa --', localStorage.getItem('authenticated'));
  return (
    <Route
      render={() => !!localStorage.getItem('authenticated') ?
        (<props.component />) : (<Redirect to='/login' />)
      }
    />
  );
};

export default ProtectedRoute;
