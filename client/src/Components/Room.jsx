import React, { Component } from 'react';
import EditorHolder from './EditorHolder.jsx';
import UserNav from './UserNav.jsx';
import io from "socket.io-client";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FloatingChatDiv from './FloatingChatDiv.jsx';
import querystring from 'querystring';

class Room extends Component {
  constructor(props) {
    super(props);

    let roomPath = window.location.pathname.split('/');

    this.state = {
      clickedTab: 'Home',
      roomId: roomPath.length === 4 ? roomPath[3] : roomPath[2],
      user: {},
      roomUsers: [],
      loading: true,
      refId: null,
      code: "hello world",
      showChatDiv: false,
      minimizeDiv: false,
      messages: [],
      repoName: roomPath.length === 4 ? roomPath[2] : '',
      githubMode: false,
      repoFileStructure: {}
    }

    this.socket = io('/athesio').connect();

    this.socket.on('connect', () => {
      this.socket.emit('room', this.state.roomId);
      this.socket.emit('retrieveChatHistory', this.state.roomId);
    });

    this.socket.on('receivedChatHistoryFromServer', (chatHistory) => {
      this.setState({ messages: chatHistory });
    });

    // assumes incoming message can only be from ANOTHER USER
    this.socket.on('newMessageFromServer', (newMessage) => {
      let updatedMessageList = this.state.messages;
      updatedMessageList.push(newMessage);
      this.setState({ messages: updatedMessageList });
    });

    this.socket.on('serverUpdateCode', (newCode) => {
      // console.log('im changing state: ', newCode);
      // this.setState({ code: newCode });
    });

    this.socket.on('codeUpdated', (code) => {
      console.log('code updated');
      this.setState({ code: code });
    });

    this.socket.on('sendUpdateOnRoom', (roomUsers) => {
      this.setState({ roomUsers: roomUsers });
    })

    // this.closeRightNav = this.closeRightNav.bind(this);
    // this.openRightNav = this.openRightNav.bind(this);
    this.logout = this.logout.bind(this);
    this.changeTabs = this.changeTabs.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.runCode = this.runCode.bind(this);
    this.createFloatingChat = this.createFloatingChat.bind(this);
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.minimizeFloatingDiv = this.minimizeFloatingDiv.bind(this);
    this.startRepoContentLoading = this.startRepoContentLoading.bind(this);
    this.openRepo = this.openRepo.bind(this);
  }

  componentDidMount() {
    axios.post('/api/enterroom', { roomId: this.state.roomId })
      .then(data => {
        axios.get('/api/retrieveRoomInfo', { params: { roomId: this.state.roomId } })
          .then(({ data }) => {
            let allUsers = [];
            for ( let users in data.roomInfo.users ) {
              allUsers.push(data.roomInfo.users[users]);
            }
            this.setState({
              refId: data.roomInfo.ref,
              loading: false,
              user: data.currentUser,
              roomUsers: allUsers
            }, this.openRepo);
            
          });
      });
  }

  openRepo() {
    if (this.state.repoName.length > 0) {
      axios.get('/api/openRepo', { params: { repoName: this.state.repoName, username: this.state.user.login, roomId: this.state.roomId } })
        .then(files => this.setState({ repoFileStructure: files.data }, this.startRepoContentLoading));
    }
  }

  startRepoContentLoading() {
    if(this.state.repoName.length > 0) {
      this.socket.emit('beginLoadingRepoContents', { repoName: this.state.repoName, username: this.state.user.login, roomId: this.state.roomId });
    }
  }
  

  sendNewMessage(newMessageText, clearInputBoxFn) {
    let newMessageObj = { text: newMessageText, user: this.state.user, roomId: this.state.roomId, createTime: new Date() };
    let updatedMessageList = this.state.messages;
    updatedMessageList.push(newMessageObj);
    this.setState({ messages: updatedMessageList }, () => {
      this.socket.emit('newMessage', newMessageObj);
      clearInputBoxFn();
    });
  }

  logout() {
    axios.post('/api/logout', { roomId: this.state.roomId, user: this.state.user })
      .then(() => window.location.assign('/'));
  }

  changeTabs(e) {
    this.setState({ clickedTab: e.target.id });
  }

  // openRightNav(e) {
  // document.getElementById("rightNav").style.width = "30%";
  // document.getElementById("Editor").style.marginRight = "30%";
  // }
  // closeRightNav() {
  //   document.getElementById("rightNav").style.width = "0";
  //   document.getElementById("Editor").style.marginRight = "0";
  // }

  handleSaveClick() {
    axios.post('/api/saveroom', { username: this.state.user.login, roomId: this.state.roomId, ref: this.state.refId })
      .then(result => console.log(result));
  }

  runCode(code) {
    this.socket.emit('codeSent', code, () => {
      console.log('sent code');
    });
  }

  createFloatingChat() {
    this.setState({ showChatDiv: !(this.state.showChatDiv) });
  }

  minimizeFloatingDiv() {
    this.setState({ minimizeDiv: !(this.state.minimizeDiv) });
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ backgroundColor: '#1e1f21' }} >
          <img src="https://i2.wp.com/merakidezain.com/wp-content/themes/snskanta/assets/img/prod_loading.gif?w=660" alt="" />
        </div>)
    } else {
      if (localStorage.getItem('authenticated')) {
        return (
          <div className="wrapper">
            {this.state.showChatDiv === true ? <FloatingChatDiv user={this.state.user} messages={this.state.messages} sendNewMessage={this.sendNewMessage} minimize={this.minimizeFloatingDiv} miniStatus={this.state.minimizeDiv} /> : null}
            {/* USER NAVIGATION BAR */}
            <nav id="userNav" className="sidenav">
              <UserNav user={this.state.user} logout={this.logout} tab={this.state.clickedTab} fileStructure={this.state.repoFileStructure} />
            </nav>

            {/* MIDDLE SECTION OF DASHBOARD */}
            <div id="Editor" >
              <div className="row" >
                <div id="iconBar" >
                  <div className="text-center" >
                    <span id="Home" data-toggle="tooltip" data-placement="right" title="Home" onClick={this.changeTabs} className="userSpan text-center icon" style={{ padding: '0px' }} >&#9776;</span>

                    {/* Github */}
                    <img id="Github" className='icon github' onClick={this.changeTabs} data-toggle="tooltip" data-placement="right" title="Github" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPYSURBVGhD7ZnLi09hGMcHjQxKCiMlzRC5DxZsZGFjbWExhSK5l2LhusJQ7vkDiCyMLExGhJSmYUOSaxOSS24LK0RmfJ73fPEb7zkz55x5f0M5n/p23vM+3+f7nF+/65ypKCgoKPh/6ejo6Nve3j4DrUZHOG/keNmk9WG0Ck03r9r+HezC0FH0ngtMBd636pmmmL8HFzEVNaN2XV9mrBfOo8mK7T2YX4n2Mvybu5oAWBbaxbJSY8oLg0Yy8IabXgbIbkXVGlcemFPLkCfRyPLBjDZUo7FhId+eibZoVPnRgxmu8WEgtz+hZXs5JcHMFg7h3jMENkTRv2HvCxqExqJN6LlKqbEetJFlLRrM+qsrlMDebl1GzyDIPmK9Tyf2rsni4LwKbUNPkX2c7kRrUb1ka9uzj2vzmLdK7Q7Oryv+F+x9RZNkyQ8hzcrsBPsnZQkGmacU3wn2m2TJBwH2jR37Zcf2CdmCQeZJxXfCrgGmypYdmo8qy4PaHdmCQeZdxXtQOyJbNui1H4Dvohif3MFdYJmK96D2hkMfWdNDU51LiIHQFxwGyBoMyyT7pRsSA7XsPzBpWqN+D2pbZAsO2Vs1xoPaStnSQ1Pi0wyzZAsOc2drhge1Q7Klh6az6vegNkK24JBdrTEe1M7Ilh6aLqk/jmGyBYe5wzXDg9pF2dJD0wX1e1CbIFtwyJ6oMR7UmmVLD33Ho3YfAufLFhyyF2iMB7VjsqWHpgPq96DWIFtwyN6jMR7U9suWHppWqN+D2n0Owe+CkNmP7MduSAzUlsuaHprGqz8W6ktlDQaZyxQfC/VxsmaDxtfKiOMj9fw/5P6APPsl8dElx8CsV7Jmh+bE94lB/T1aKHtuyFiEPig2Fur7ZM8OzePQd2VZ2EG0Ht3SloPzFrQEpb77gXcUWoZuKiYRPHYNtWrNByFNUZwLtL/sJrG0+1qNbrMEasYzNE/tHtTmosQfhnHgP6v2/BBiz8pnZVqovZxqWA7k+CDa/Q17N9WaCJ5W2bsFr83u2bPxE8J2RLERnJ/Wfg369TJj/R2tc01dgHVz1NE95G1TW88hz24HXY2iXbgxRbU+qI7zOSjVfSh8i11QN+Czmf3VFgYChxD8yE0A1rc5DFU5E/TWRynJ4LE/e4eoJSyE20vpYTTKDXuJNrC0Z2Q0msl6pOyJ4OvygVC/h8bIXh6YM5QhV6KRPnaRsibS1QNRdq5nOjMMqmTgdvTJTS8h7wOxLMtk2Tv/ViiFwXa79Bwq/dLM9ECsVxljVf572EWg/ci+4bu9IK7f/j1h3gNp/AUFBQUF/ygVFT8AY+bgUQPzIZ4AAAAASUVORK5CYII="></img>

                    {/* Chat */}
                    <p style={{ marginTop: '5px', marginBottom: '8px', cursor: 'pointer' }} data-toggle="tooltip" data-placement="right" title="Click to open and close chat" >
                      <em onClick={this.createFloatingChat} style={{ color: 'white', fontSize: '15px' }}> Chat </em>
                    </p>

                    {/* Unit Testing icon */}
                    <img id="Test" data-toggle="tooltip" data-placement="right" title="Unit Testing" onClick={this.changeTabs} className="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVGhD7ZpNiE1xGMYv+YghYygLTMyCNNRMIgsrY2PJsLnJUrKQjSRbKTXsxCxmI7JiZ6Gx8LEgnyUK42NLiTE3RcPl9x7POR333NM5Z5r/vedwnnp673nf93n/79OcW3fOvRVXqNfrm+Ao/ALfwSG4UOVigIW3wK+/GkDuFmGO2vIPFr6rxb2/AlwHnym3T22tAWfO59Cz8LMtkBXo3hNmaJyZ2/mnkg3oDC/goEZlA8JhDfoJP8WRlnH1/WiondYoD1wvga9C9QnpJkO5ZqyF5m/WuHRANxPRhIl53aN0U1Dv1kFPlUoFJFulu6NULOg5od4zSqUDmkUmBONKxYIe38hzwuK0pH8HMa2RqnovKZUOaDIbmSpY7rZGxaIlRhg+D96Hze7vJH6ERzQqFvS4N9IKlEbQlEZcoDSCpjTiAoUzwqLL4VxdBiiUEZbcBu2D4UWlAhTGCOcsYMm3diDxmNIBnBlh4DJqPSn513+EaCO3D9fn6LNFHxFmKx2A/PQbYdhaOKl6Iui9Kqlp15gWPqDUqdwANHyHG7zGBpB3YqQLjlJ7mIb0HpLU5nZy/YZosNpK6N9Sx9UWAbX8vUeY2R1a3ntAQbS/0Cy1RJBLIwbmhs18g70qNUVujRiYbWbsFt2vVCxybSQLSiNoSiMuUDgjLNoPu3QZoFBGWHIQGq4oFYBcMYxwzlKW/GAHEg8oHcCZEfJ9cHsSOXiA6H2m8kEucvtwfZk+w00YPPj2QX36jTCsF9ZVTwSt1yQ17XrlxuAK5XYrV4OrvcYGkHdipMMGQvs2KonXYVVS09pTycc2mDhG6CP6t9RBtUVALX/vEZaxrxee2HCiPe23eIMQuaV8UM/nm52Fwmbse5JVKjVFbo0YZGYEJn4TlWsjWVAaQVMacYHSCJp/wwiCDglrSrUV7LFX+1xQKj0QvZb4FGFPu8j5VXiP17bLUa2XHoh2wdRPFF2DXV7Cqf26CP1GxCfhcBt5Hh6GxfqJ1H+OSuU3BeOJgEllFsMAAAAASUVORK5CYII=" />

                    {/* Slack icon */}
                    <img id="Slack" data-toggle="tooltip" data-placement="right" title="Slack" className="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkIzMDA7IiBkPSJNIDMxLjE5OTIxOSAxMC42MDE1NjMgTCAyNC42MDE1NjMgMTIuODk4NDM4IEwgMjMuMTk5MjE5IDguNjAxNTYzIEMgMjIuNjAxNTYzIDYuODAwNzgxIDIzLjUgNC44MDA3ODEgMjUuMzk4NDM4IDQuMTk5MjE5IEMgMjcuMTk5MjE5IDMuNjAxNTYzIDI5LjE5OTIxOSA0LjUgMjkuODAwNzgxIDYuMzk4NDM4IFogTSAyOS4xOTkyMTkgMjYuNjAxNTYzIEwgMzUuODAwNzgxIDI0LjMwMDc4MSBMIDMzLjUgMTcuMTk5MjE5IEwgMjYuODk4NDM4IDE5LjUgWiBNIDMyLjYwMTU2MyAzNi44MDA3ODEgQyAzMy4xMDE1NjMgMzguMTk5MjE5IDM0LjUgMzkuMTk5MjE5IDM1Ljg5ODQzOCAzOS4xOTkyMTkgQyAzNi4zMDA3ODEgMzkuMTk5MjE5IDM2LjY5OTIxOSAzOS4xMDE1NjMgMzcgMzkgQyAzOC44MDA3ODEgMzguMzk4NDM4IDM5LjgwMDc4MSAzNi4zOTg0MzggMzkuMTk5MjE5IDM0LjYwMTU2MyBMIDM4IDMxIEwgMzEuMzk4NDM4IDMzLjMwMDc4MSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojMDBCRkE1OyIgZD0iTSAxNy4xOTkyMTkgMTUuNSBMIDEwLjYwMTU2MyAxNy44MDA3ODEgTCA5LjE5OTIxOSAxMy42MDE1NjMgQyA4LjYwMTU2MyAxMS44MDA3ODEgOS41IDkuODAwNzgxIDExLjM5ODQzOCA5LjE5OTIxOSBDIDEzLjE5OTIxOSA4LjYwMTU2MyAxNS4xOTkyMTkgOS41IDE1LjgwMDc4MSAxMS4zOTg0MzggWiBNIDE4LjYwMTU2MyA0MS44MDA3ODEgQyAxOS4xMDE1NjMgNDMuMTk5MjE5IDIwLjUgNDQuMTk5MjE5IDIxLjg5ODQzOCA0NC4xOTkyMTkgQyAyMi4zMDA3ODEgNDQuMTk5MjE5IDIyLjY5OTIxOSA0NC4xMDE1NjMgMjMgNDQgQyAyNC44MDA3ODEgNDMuMzk4NDM4IDI1LjgwMDc4MSA0MS4zOTg0MzggMjUuMTk5MjE5IDM5LjYwMTU2MyBMIDI0IDM1Ljg5ODQzOCBMIDE3LjM5ODQzOCAzOC4xOTkyMTkgWiBNIDE5LjM5ODQzOCAyMi4xOTkyMTkgTCAxMi44MDA3ODEgMjQuNSBMIDE1LjEwMTU2MyAzMS42MDE1NjMgTCAyMS42OTkyMTkgMjkuMzAwNzgxIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMwMEJDRDQ7IiBkPSJNIDMzLjM5ODQzOCAxNy4zMDA3ODEgTCAzMS4xOTkyMTkgMTAuNjk5MjE5IEwgMzUuMzAwNzgxIDkuMzAwNzgxIEMgMzcuMTAxNTYzIDguNjk5MjE5IDM5LjEwMTU2MyA5LjYwMTU2MyAzOS42OTkyMTkgMTEuNSBDIDQwLjMwMDc4MSAxMy4zMDA3ODEgMzkuMzk4NDM4IDE1LjMwMDc4MSAzNy41IDE1Ljg5ODQzOCBaIE0gMjYuODAwNzgxIDE5LjYwMTU2MyBMIDI0LjYwMTU2MyAxMyBMIDE3LjE5OTIxOSAxNS42MDE1NjMgTCAxOS4zOTg0MzggMjIuMTk5MjE5IFogTSA2LjM5ODQzOCAxOS4zMDA3ODEgQyA0LjYwMTU2MyAxOS44OTg0MzggMy42MDE1NjMgMjEuODk4NDM4IDQuMTk5MjE5IDIzLjY5OTIxOSBDIDQuNjk5MjE5IDI1LjE5OTIxOSA2LjEwMTU2MyAyNi4xMDE1NjMgNy41IDI2LjEwMTU2MyBDIDcuODk4NDM4IDI2LjEwMTU2MyA4LjMwMDc4MSAyNiA4LjYwMTU2MyAyNS44OTg0MzggTCAxMi42OTkyMTkgMjQuNSBMIDEwLjUgMTcuODk4NDM4IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNFOTFFNjM7IiBkPSJNIDE1LjEwMTU2MyAzMS41IEwgMTcuMzAwNzgxIDM4LjEwMTU2MyBMIDEyLjYwMTU2MyAzOS42OTkyMTkgQyAxMi4xOTkyMTkgMzkuODAwNzgxIDExLjgwMDc4MSAzOS44OTg0MzggMTEuNSAzOS44OTg0MzggQyAxMCAzOS44OTg0MzggOC42OTkyMTkgMzkgOC4xOTkyMTkgMzcuNSBDIDcuNjAxNTYzIDM1LjY5OTIxOSA4LjUgMzMuNjk5MjE5IDEwLjM5ODQzOCAzMy4xMDE1NjMgWiBNIDQzLjY5OTIxOSAyNS4zMDA3ODEgQyA0My4xMDE1NjMgMjMuNSA0MS4xMDE1NjMgMjIuNSAzOS4zMDA3ODEgMjMuMTAxNTYzIEwgMzUuODAwNzgxIDI0LjMwMDc4MSBMIDM4IDMxIEwgNDEuNjAxNTYzIDI5LjgwMDc4MSBDIDQzLjM5ODQzOCAyOS4xMDE1NjMgNDQuMzk4NDM4IDI3LjEwMTU2MyA0My42OTkyMTkgMjUuMzAwNzgxIFogTSAyMS42OTkyMTkgMjkuMTk5MjE5IEwgMjMuODk4NDM4IDM1LjgwMDc4MSBMIDMxLjMwMDc4MSAzMy4xOTkyMTkgTCAyOS4xMDE1NjMgMjYuNjAxNTYzIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMzODhFM0M7IiBkPSJNIDMzLjM5ODQzOCAxNy4zMDA3ODEgTCAzMS4xOTkyMTkgMTAuNjAxNTYzIEwgMjQuNjAxNTYzIDEyLjg5ODQzOCBMIDI2LjgwMDc4MSAxOS42MDE1NjMgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzAwODk3QjsiIGQ9Ik0gMTcuMTk5MjE5IDE1LjUgTCAxMC42MDE1NjMgMTcuODAwNzgxIEwgMTIuODAwNzgxIDI0LjUgTCAxOS4zOTg0MzggMjIuMTk5MjE5IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNCRjM2MEM7IiBkPSJNIDI5LjE5OTIxOSAyNi42MDE1NjMgTCAzMS4zOTg0MzggMzMuMzAwNzgxIEwgMzggMzEgTCAzNS44MDA3ODEgMjQuMzAwNzgxIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiM0RTM0MkU7IiBkPSJNIDE1LjEwMTU2MyAzMS41IEwgMTcuMzAwNzgxIDM4LjE5OTIxOSBMIDIzLjg5ODQzOCAzNS44OTg0MzggTCAyMS42OTkyMTkgMjkuMTk5MjE5IFogIj48L3BhdGg+PC9nPjwvc3ZnPg=="></img>

                  </div>
                </div>

                <div className="col-xs-11 col-md-11 col-lg-11" id="main" >
                  {/* NAME OF THE APPLICATION/ TOP NAVBAR AREA */}
                  <div className="row" style={{ paddingTop: '5px' }} >
                    <div className="col-xs-4 col-md-4 col-lg-4"  >
                      <p className="text-center" >
                        <a style={{ color: '#ffffff' }} >Share room: {this.state.roomId}</a>
                      </p>
                    </div>
                    <div className="col-xs-8 col-md-8 col-lg-8" id="userDiv" >
                      {this.state.roomUsers.map((user, i) => {
                        if (this.state.user.login !== user.username) {
                          return (
                            <a key={i} style={{ color: '#f1f1f1', fontSize: '12px', float: 'right' }} className="joinedUsers" >
                              <img className="img-circle text-right" id="userImg" src={user.avatar_url} /> {user.username}
                            </a>
                          )
                        }
                      })
                      }
                    </div>
                  </div>

                  {/* HOLDS BOTH THE FIREPAD AND THE IFRAME */}
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="navBtm" style={{ paddingLeft: '0px' }} >
                    <EditorHolder roomId={this.state.roomId} user={this.state.user} allUsers={this.state.roomUsers} refId={this.state.refId} code={this.state.code} runCode={this.runCode} handleSaveClick={this.handleSaveClick} />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT NAVIGATION BAR */}
            <nav id="rightNav" className="rightNav">
            </nav>
          </div>
        )
      } else {
        return (<Redirect to='/login' />)
      }
    }
  }
}

export default Room;
