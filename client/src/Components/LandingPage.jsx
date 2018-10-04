import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = (props) => (
  <div>
    <h2> Welcome to the best collaborative coding environment EVER </h2>
    <Link to='/login'>Get started</Link>
  </div>
);

export default LandingPage;
