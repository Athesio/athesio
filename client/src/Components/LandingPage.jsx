import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import SelectRoom from './SelectRoom.jsx';
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authStatus: false
    }
  }

  async getAuthStatus() {
    return await axios.get('/api/authstatus')
      .then(async authStatus => {
        localStorage.setItem('authenticated', authStatus.data);
        this.setState({
          loading: false
        })
      });
  };

  componentDidMount() {
    this.getAuthStatus();
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    } else if (!this.state.loading && localStorage.getItem('authenticated') === 'true') {
      return (<ProtectedRoute component={SelectRoom} />);
    } else {
      return (
        <div className="container" id="Landing">
        <div className="row" id="titleBox" >
          <div className="col-xs-12 col-lg-12 text-center" >
            <a className="text-pop-up-top" style={{ fontSize: "250px" }} id="title">ATHESIO</a>
          </div>
          <div className="text-center" >
            <a  style={{ color: '#ffffff'}}>____________________________________________________________________________</a>
          </div>
         </div>
          <div className="row" >
            <div className="col-xs-12 col-lg-12 text-center" >
              <h2> Welcome to the best collaborative coding environment  <em> EVER. </em> </h2>
            </div>
          </div>
          <div className="text-center">
            <Link to='/login'>Get started</Link>
          </div>

          <div className="row" id="LandingTech" >
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <a>Editing</a>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <a>GitHub Integration</a>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <a>Slack</a>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-3" >
              <a>Video Chatting</a>
            </div>
          </div>
        </div>
      );
    }
  }

}

export default withRouter(LandingPage);
