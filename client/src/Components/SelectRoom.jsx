import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import Session from './Session.jsx';

class SelectRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      previousSessions: []
    }

    this.createRoomId = this.createRoomId.bind(this);
    this.createNewRoom = this.createNewRoom.bind(this);
    this.joinRoomIfValid = this.joinRoomIfValid.bind(this);
  }

  createRoomId(cb) {
    axios.get('/api/roomId')
      .then((data) => {
        this.setState({
          value: data.data
        }, cb);
      });
  }

  componentDidMount() {
    axios.get('/db/getPreviousRoomsForUser')
      .then((history) => {
        this.setState({ previousSessions: history });
      })
  }

  createNewRoom() {
    this.createRoomId(() => {
      this.props.history.push(`/room/${this.state.value}`);
    });
  }

  joinRoomIfValid() {
    axios.get('/api/validateRoomId', { params: { roomId: this.state.value } })
      .then(({ data }) => {
        if (data.isValid) {
          this.props.history.push(`/room/${this.state.value}`);
        } else {
          this.setState({
            value: ''
          });
        }
      });
  }


  render() {
    if (localStorage.getItem('authenticated') === 'true') {
      return (
        <div id="SelectRoom" >
          <div className="container-fluid" id="SelectRoomBox" >
            <div className="row" id="formBox" >
              <div className="col-md-3"   ></div>
              <div className="col-md-6"  >
                <form role="form" >
                  <div className="form-group" >
                    <label htmlFor="NewEditor">Open New Editor</label><br />
                    <button className="btn" onClick={() => this.createNewRoom()} type="button" >New Editor</button>
                  </div>
                  <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }} >
                    <a className="text-center" >Join a Room </a><br />
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Room Key" value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value }) }}></input>

                      <span className="input-group-btn">
                        <button
                          className="btn"
                          type="button"
                          onClick={this.joinRoomIfValid}
                        >JOIN</button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-3" ></div>
            </div>
            {/* PREVIOUS SESSIONS IF EXIST */}
            {
              this.state.previousSessions.length > 0 ?
                <div className="row" >
                  <div className="col-md-3" ></div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                    <div className="text-center" >
                      <a > PREVIOUS SESSIONS</a>
                      {
                        this.state.previousSessions.map(sessionInfo => <Session info={sessionInfo} key={sessionInfo.ref} />)
                      }
                    </div>
                  </div>
                  <div className="col-md-3" ></div>
                </div>
                :
                ('')
            }
          </div>
        </div>
      )
    } else {
      <Redirect to='/login' />
    }

  }
}

export default withRouter(SelectRoom);
