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
      repos: [],
      gists: [],
      username: '',
      selectedRepo: '',
      hovered: false,
      showDataGithubMode: false,
      showDataReplMode: false,
      modes: {
        GithubMode: ['Github Mode' ,'Open a repo from Github to open and collaboratively edit files.'],
        ReplMode: ['REPL.mode','Perfect for interviews and collaborative code writing/testing.']
      }
    }

    this.createRoomId = this.createRoomId.bind(this);
    this.createNewRoom = this.createNewRoom.bind(this);
    this.joinRoomIfValid = this.joinRoomIfValid.bind(this);
    this.getPreviousSessions = this.getPreviousSessions.bind(this);
    this.retrieveUserGithubGists = this.retrieveUserGithubGists.bind(this);
    this.handlePreviousSessionClick = this.handlePreviousSessionClick.bind(this);
    this.addHover = this.addHover.bind(this);
    this.removeHover = this.removeHover.bind(this);
    this.showModeContent = this.showModeContent.bind(this);
    this.changeDiv = this.changeDiv.bind(this);
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
      .then((repoName) => {
        if (repoName.data.isValid == false) {
          this.setState({
            value: ''
          });
        } else if (repoName.data.length > 0) { // repo name exists in roomInfo
          this.props.history.push(`/room/${repoName.data}/${this.state.value}`);
        } else {
          this.props.history.push(`/room/${this.state.value}`);
        }
      });
  }

  retrieveUserGithubRepos() {
    axios.get('/api/github/repos/', { params: { user: `${this.state.username}` } })
      .then(({ data }) => { this.setState({repos : data}, this.retrieveUserGithubGists) });
  }

  retrieveUserGithubGists() {
    axios.get('/api/github/gists', { params: { username: `${this.state.username}` } })
      .then(({ data }) => { this.setState({ gists: data }) });
  }

  handlePreviousSessionClick(session) {
    this.props.history.push({
      pathname: `/room/${session.roomId}`,
      state: { prevRef: session.ref }
    });
  }

  addHover(e) {
    // Labels the mode with an an ID
    let target = document.getElementById(`${e.target.id}`);
    document.getElementById(`${e.target.id}`).className = `${e.target.id}Hover`;
    
    // The mode's title and message appended to the title element
    let titleElement = document.createElement("h5");
    titleElement.setAttribute('id', `${e.target.id}Hover`);
    let title = document.createTextNode(`${this.state.modes[e.target.id][0]}`);
    titleElement.appendChild(title);
    
    // The mode's explanaition and message appended to explanaition element
    let messageElement = document.createElement("h2");
    let message = document.createTextNode(`${this.state.modes[e.target.id][1]}`);
    messageElement.setAttribute('id', `${e.target.id[0]}`);
    messageElement.appendChild(message);
    
    let br = document.createElement("br");

    // The mode's start call to action and message appended to the title element    
    let button = document.createElement("em");
    let buttonText = document.createTextNode("[click to start]");
    button.setAttribute('id', `${e.target.id[0]}`);
    button.appendChild(buttonText);

    // Appending all of the above elements to the original tag
    titleElement.appendChild(messageElement);
    titleElement.appendChild(button);
    titleElement.appendChild(br);
    target.appendChild(titleElement);
    
    // Opening the div
    target.style.width = '90%';
    e.target.id === 'GithubMode' ?  document.getElementById('ReplMode').style.width='10%' :  document.getElementById('GithubMode').style.width='10%';

  }

  removeHover(e) {
    // removing the child element from the original div
    let target = document.getElementById(`${e.target.id}`);
    target.childNodes.length > 0 ? target.removeChild(target.childNodes[0]) : null;
    target.style.width = '50%';
    e.target.id === 'GithubMode' ? document.getElementById('ReplMode').style.width='50%' : document.getElementById('GithubMode').style.width='50%';
    e.target.id === 'GithubMode' ? this.setState({ showDataGithubMode: false }) : this.setState({ showDataReplMode: false });    
  }

  showModeContent(e) {
    // handles removing child element and keeping the div open to show contents
    let GithubMode = document.getElementById('GithubMode');
    let ReplMode = document.getElementById('ReplMode');
    e.target.id.includes('G') ? GithubMode.removeChild(GithubMode.childNodes[0]) : ReplMode.removeChild( ReplMode.childNodes[0]); 
    e.target.id.includes('G') ? GithubMode.style.width='90%' :  ReplMode.style.width='90%';
    e.target.id.includes('G') ? ReplMode.style.width='10%' : GithubMode.style.width='10%';
    e.target.id.includes('G') ? this.setState({ showDataGithubMode: true }) : this.setState({ showDataReplMode: true });
  } 

  changeDiv(e) {
    let lastValue = e.target.id;
    // removes details from div
    e.target.id === "GitModeDetails" ? null : this.setState({ showDataReplMode: false });
    e.target.id === "ReplModeDetails" ? null : this.setState({ showDataGithubMode: false });

    // closes div
    if(lastValue.includes("Github")) {
      document.getElementById('ReplMode').style.width='50%';
      document.getElementById('GithubModeDetails').style.width='50%';
    }
    if(lastValue.includes("Repl")) {
      document.getElementById('ReplModeDetails').style.width='50%';
      document.getElementById('GithubMode').style.width='50%';
    }
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
          <div id="Morpheus"  >
            
            {
              this.state.showDataGithubMode === true ? 
              <div id="GithubModeDetails" onMouseLeave={this.changeDiv} >
                <div className="container-fluid" id="SelectRoomBox" >
                <div className="row" id="formBoxGithub" >
                  <div className="col-md-3"   ></div>
                  <div className="col-md-6"  >
                    <form role="form" >
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
                {
                  this.state.repos.length > 0 ?
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
                                <th align="left" className="text-center" >Repo Name</th>
                                <th className="text-center" ></th>
                                <th align="right" className="text-center" >Language</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.repos.map((repo, i) => <Session info={repo} key={i} handleClick={()=>{ this.setState({ selectedRepo: repo.name }, () => { this.createNewRoom() })}}/>)
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
              : <div id="GithubMode" onMouseEnter={this.addHover} onMouseLeave={this.removeHover} onClick={this.showModeContent}></div>
            }
            
            {this.state.showDataReplMode === true ? 
              <div id="ReplModeDetails" onMouseLeave={this.changeDiv} >
                <div className="container-fluid" id="SelectRoomBox" >
                <div className="row" id="formBoxRepl" >
                  <div className="col-md-3"   ></div>
                  <div className="col-md-6"  >
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
                                this.state.previousSessions.map( (sessionInfo, i) => <Session info={sessionInfo} key={i} handleClick={this.handlePreviousSessionClick}/>)
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
            : <div id="ReplMode" onMouseEnter={this.addHover} onMouseLeave={this.removeHover} onClick={this.showModeContent} ></div>
            } 
            
          </div>
        )
      } else {
        <Redirect to='/login' />
      }

    }
  }
}

export default withRouter(SelectRoom);
