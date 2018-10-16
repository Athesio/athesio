import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import Session from './Session.jsx';
import { Button } from 'reactstrap';


class SelectRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: true,
      previousSessions: [],
      githubMode: false, //github mode or not
      type: '', //repo or gist
      repos: [],
      gists: [],
      username: '',
      selectedRepo: '',
    }

    this.createRoomId = this.createRoomId.bind(this);
    this.createNewRoom = this.createNewRoom.bind(this);
    this.joinRoomIfValid = this.joinRoomIfValid.bind(this);
    this.getPreviousSessions = this.getPreviousSessions.bind(this);

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
    this.setState({ loading: true, previousSessions: [] }, () => { this.getPreviousSessions() })

  }
  getPreviousSessions() {
    axios.get('/api/getPreviousRoomsForUser')
      .then(({ data }) => {
        this.setState({
          previousSessions: data.history,
          loading: false,
          username: data.user
        });
      })
      .then(() => {
        this.retrieveUserGithubRepos();
      })
  }

  createNewRoom() {
    if (this.state.selectedRepo.length > 0){
      this.createRoomId(() => {
        this.props.history.push(`/room/${this.state.selectedRepo}/${this.state.value}`);
      });
    } else {
      this.createRoomId(() => {
        this.props.history.push(`/room/${this.state.value}`);
      });
    }
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

  retrieveUserGithubRepos() {
    axios.get('/api/github/repos/', { params: { user: `${this.state.username}` } })
    .then(({ data }) => { this.setState({repos : data}) });
  }
  


  render() {
    if (this.state.loading) {
      return (
        <div style={{ backgroundColor: '#1e1f21' }} >
          <img src="https://i2.wp.com/merakidezain.com/wp-content/themes/snskanta/assets/img/prod_loading.gif?w=660" alt="" />
        </div>);
    } else {
      if (localStorage.getItem('authenticated') === 'true') {
        return (
          <div id="Morpheus" >
            <div id="GithubMode">
              <div className="dropdown"  >
                <Button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                  Repos
                </Button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                  {
                    this.state.repos.map((repo, i) => {
                      return <a className="dropdown-item" key={i} onClick={()=>{ this.setState({ selectedRepo: repo.name }, () => { this.createNewRoom() })}} >{repo.name}</a>
                    })
                  }
                </div>
                {/* <ul>
                {
                    this.state.repos.map((repo, i) => {
                      return <li className="dropdown-item" key={i} onClick={()=>{ this.setState({ selectedRepo: repo.name }, () => { this.createNewRoom() })}} >{repo.name}</li>
                    })
                  }
                </ul>  */}
              </div>
            </div>
            <div id="SelectRoom" >
              <div className="container-fluid" id="SelectRoomBox" >
                <div className="row" id="formBox" >
                  <div className="col-md-1"   ></div>
                  <div className="col-md-10"  >
                    <form role="form" >
                      <div className="form-group" >
                        <label htmlFor="NewEditor">Open New Editor</label><br />
                        <Button className="btn" onClick={() => this.createNewRoom()} type="button" >New Editor</Button>
                      </div>
                      <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }} >
                        <a className="text-center" >Join a Room </a><br />
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Room Key" value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value }) }}></input>

                          <span className="input-group-btn">
                            <Button
                              className="btn"
                              type="button"
                              onClick={this.joinRoomIfValid}
                            >JOIN</Button>
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-1" ></div>
                </div>
                {/* PREVIOUS SESSIONS IF EXIST */}
                {
                  this.state.previousSessions.length > 0 ?
                    <div className="row" >
                      <div className="col-md-1" ></div>
                      <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" >
                        <div className="text-center" id="sessionTable" >
                          <a > PREVIOUS SESSIONS</a>
                        </div>
                        <div className="table-responsive" >
                          <table id="session" className="table col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                            <thead  >
                              <tr>
                                <th align="left" className="text-center" >Title</th>
                                <th className="text-center" ></th>
                                <th align="right" className="text-center" >Last Modified</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.previousSessions.map(sessionInfo => <Session info={sessionInfo} key={sessionInfo.ref} />)
                              }
                            </tbody>

                          </table>
                        </div>
                      </div>
                      <div className="col-md-1" ></div>
                    </div>
                    :
                  null
                }
              </div>
            </div>
          </div>
        )
      } else {
        <Redirect to='/login' />
      }

    }
  }
}

export default withRouter(SelectRoom);
