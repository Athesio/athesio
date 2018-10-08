import React from 'react';
import EditorHolder from './EditorHolder.jsx';
import UserNav from './UserNav.jsx';
import GithubNav from './DashGithubNav.jsx';
import ChatNav from './ChatNav.jsx';
import otherUsers from '../../fakeOtherUsers.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedTab: '',
      tabs: ['GitHub', 'Comm'],
      roomId: window.location.pathname.split('/')[2],
      user: {},
      otherUsers: [],
      loading: true,
      refId: null
    }

    this.closeRightNav = this.closeRightNav.bind(this);
    this.openRightNav = this.openRightNav.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.post('/api/enterroom', { roomId: this.state.roomId })
      .then(data => {
        axios.get('/api/retrieveRoomInfo', { params: { roomId: this.state.roomId } })
          .then(({ data }) => {
            this.setState({
              refId: data.roomInfo.ref,
              loading: false,
              user: data.currentUser,
            })
          }
          );
      }
      );
  }

  logout() {
    axios.post('/api/logout', { roomId: this.state.roomId, user: this.state.user })
      .then(result => window.location.assign('/'));
  }

  changeTabs(e) {
    console.log(e.target.name);
    console.log(e.target.className);

  }

  openRightNav(e) {
    // let tab = e.target.className.split("Span")[0];
    // if (tab === 'github') {
    //   this.setState({ clickedTab: 'github' });
    // } else {
    //   this.setState({ clickedTab: 'chat' });
    // }
    // document.getElementById("rightNav").style.width = "30%";
    // document.getElementById("Editor").style.marginRight = "30%";
  }

  closeRightNav() {
    document.getElementById("rightNav").style.width = "0";
    document.getElementById("Editor").style.marginRight = "0";
  }


  render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    } else {
      if (localStorage.getItem('authenticated')) {
        return (
          <div className="wrapper">
            {/* USER NAVIGATION BAR */}
            <nav id="userNav" className="sidenav">
              <UserNav user={this.state.user} logout={this.logout} />
            </nav>


            {/* MIDDLE SECTION OF DASHBOARD */}
            <div id="Editor" >
              <div className="row" >
                <div id="iconBar" >
                  <div className="text-center" >
                    <span name="Home" onClick={this.openRightNav} className="userSpan text-center icon" style={{ padding: '0px' }} >&#9776;</span>

                    {/* SVG is for the Github icon */}
                    <svg
                      value="github"
                      onClick={this.openRightNav}
                      className='icon github'
                      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="30" height="30"
                      viewBox="0 0 50 50"
                      style={{ fill: "#ffffff" }}>
                      <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                    </svg>

                    {/* Slack icon */}
                    <img name="Slack" onClick={this.openRightNav} className='icon' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkIzMDA7IiBkPSJNIDMxLjE5OTIxOSAxMC42MDE1NjMgTCAyNC42MDE1NjMgMTIuODk4NDM4IEwgMjMuMTk5MjE5IDguNjAxNTYzIEMgMjIuNjAxNTYzIDYuODAwNzgxIDIzLjUgNC44MDA3ODEgMjUuMzk4NDM4IDQuMTk5MjE5IEMgMjcuMTk5MjE5IDMuNjAxNTYzIDI5LjE5OTIxOSA0LjUgMjkuODAwNzgxIDYuMzk4NDM4IFogTSAyOS4xOTkyMTkgMjYuNjAxNTYzIEwgMzUuODAwNzgxIDI0LjMwMDc4MSBMIDMzLjUgMTcuMTk5MjE5IEwgMjYuODk4NDM4IDE5LjUgWiBNIDMyLjYwMTU2MyAzNi44MDA3ODEgQyAzMy4xMDE1NjMgMzguMTk5MjE5IDM0LjUgMzkuMTk5MjE5IDM1Ljg5ODQzOCAzOS4xOTkyMTkgQyAzNi4zMDA3ODEgMzkuMTk5MjE5IDM2LjY5OTIxOSAzOS4xMDE1NjMgMzcgMzkgQyAzOC44MDA3ODEgMzguMzk4NDM4IDM5LjgwMDc4MSAzNi4zOTg0MzggMzkuMTk5MjE5IDM0LjYwMTU2MyBMIDM4IDMxIEwgMzEuMzk4NDM4IDMzLjMwMDc4MSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojMDBCRkE1OyIgZD0iTSAxNy4xOTkyMTkgMTUuNSBMIDEwLjYwMTU2MyAxNy44MDA3ODEgTCA5LjE5OTIxOSAxMy42MDE1NjMgQyA4LjYwMTU2MyAxMS44MDA3ODEgOS41IDkuODAwNzgxIDExLjM5ODQzOCA5LjE5OTIxOSBDIDEzLjE5OTIxOSA4LjYwMTU2MyAxNS4xOTkyMTkgOS41IDE1LjgwMDc4MSAxMS4zOTg0MzggWiBNIDE4LjYwMTU2MyA0MS44MDA3ODEgQyAxOS4xMDE1NjMgNDMuMTk5MjE5IDIwLjUgNDQuMTk5MjE5IDIxLjg5ODQzOCA0NC4xOTkyMTkgQyAyMi4zMDA3ODEgNDQuMTk5MjE5IDIyLjY5OTIxOSA0NC4xMDE1NjMgMjMgNDQgQyAyNC44MDA3ODEgNDMuMzk4NDM4IDI1LjgwMDc4MSA0MS4zOTg0MzggMjUuMTk5MjE5IDM5LjYwMTU2MyBMIDI0IDM1Ljg5ODQzOCBMIDE3LjM5ODQzOCAzOC4xOTkyMTkgWiBNIDE5LjM5ODQzOCAyMi4xOTkyMTkgTCAxMi44MDA3ODEgMjQuNSBMIDE1LjEwMTU2MyAzMS42MDE1NjMgTCAyMS42OTkyMTkgMjkuMzAwNzgxIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMwMEJDRDQ7IiBkPSJNIDMzLjM5ODQzOCAxNy4zMDA3ODEgTCAzMS4xOTkyMTkgMTAuNjk5MjE5IEwgMzUuMzAwNzgxIDkuMzAwNzgxIEMgMzcuMTAxNTYzIDguNjk5MjE5IDM5LjEwMTU2MyA5LjYwMTU2MyAzOS42OTkyMTkgMTEuNSBDIDQwLjMwMDc4MSAxMy4zMDA3ODEgMzkuMzk4NDM4IDE1LjMwMDc4MSAzNy41IDE1Ljg5ODQzOCBaIE0gMjYuODAwNzgxIDE5LjYwMTU2MyBMIDI0LjYwMTU2MyAxMyBMIDE3LjE5OTIxOSAxNS42MDE1NjMgTCAxOS4zOTg0MzggMjIuMTk5MjE5IFogTSA2LjM5ODQzOCAxOS4zMDA3ODEgQyA0LjYwMTU2MyAxOS44OTg0MzggMy42MDE1NjMgMjEuODk4NDM4IDQuMTk5MjE5IDIzLjY5OTIxOSBDIDQuNjk5MjE5IDI1LjE5OTIxOSA2LjEwMTU2MyAyNi4xMDE1NjMgNy41IDI2LjEwMTU2MyBDIDcuODk4NDM4IDI2LjEwMTU2MyA4LjMwMDc4MSAyNiA4LjYwMTU2MyAyNS44OTg0MzggTCAxMi42OTkyMTkgMjQuNSBMIDEwLjUgMTcuODk4NDM4IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNFOTFFNjM7IiBkPSJNIDE1LjEwMTU2MyAzMS41IEwgMTcuMzAwNzgxIDM4LjEwMTU2MyBMIDEyLjYwMTU2MyAzOS42OTkyMTkgQyAxMi4xOTkyMTkgMzkuODAwNzgxIDExLjgwMDc4MSAzOS44OTg0MzggMTEuNSAzOS44OTg0MzggQyAxMCAzOS44OTg0MzggOC42OTkyMTkgMzkgOC4xOTkyMTkgMzcuNSBDIDcuNjAxNTYzIDM1LjY5OTIxOSA4LjUgMzMuNjk5MjE5IDEwLjM5ODQzOCAzMy4xMDE1NjMgWiBNIDQzLjY5OTIxOSAyNS4zMDA3ODEgQyA0My4xMDE1NjMgMjMuNSA0MS4xMDE1NjMgMjIuNSAzOS4zMDA3ODEgMjMuMTAxNTYzIEwgMzUuODAwNzgxIDI0LjMwMDc4MSBMIDM4IDMxIEwgNDEuNjAxNTYzIDI5LjgwMDc4MSBDIDQzLjM5ODQzOCAyOS4xMDE1NjMgNDQuMzk4NDM4IDI3LjEwMTU2MyA0My42OTkyMTkgMjUuMzAwNzgxIFogTSAyMS42OTkyMTkgMjkuMTk5MjE5IEwgMjMuODk4NDM4IDM1LjgwMDc4MSBMIDMxLjMwMDc4MSAzMy4xOTkyMTkgTCAyOS4xMDE1NjMgMjYuNjAxNTYzIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMzODhFM0M7IiBkPSJNIDMzLjM5ODQzOCAxNy4zMDA3ODEgTCAzMS4xOTkyMTkgMTAuNjAxNTYzIEwgMjQuNjAxNTYzIDEyLjg5ODQzOCBMIDI2LjgwMDc4MSAxOS42MDE1NjMgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzAwODk3QjsiIGQ9Ik0gMTcuMTk5MjE5IDE1LjUgTCAxMC42MDE1NjMgMTcuODAwNzgxIEwgMTIuODAwNzgxIDI0LjUgTCAxOS4zOTg0MzggMjIuMTk5MjE5IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNCRjM2MEM7IiBkPSJNIDI5LjE5OTIxOSAyNi42MDE1NjMgTCAzMS4zOTg0MzggMzMuMzAwNzgxIEwgMzggMzEgTCAzNS44MDA3ODEgMjQuMzAwNzgxIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiM0RTM0MkU7IiBkPSJNIDE1LjEwMTU2MyAzMS41IEwgMTcuMzAwNzgxIDM4LjE5OTIxOSBMIDIzLjg5ODQzOCAzNS44OTg0MzggTCAyMS42OTkyMTkgMjkuMTk5MjE5IFogIj48L3BhdGg+PC9nPjwvc3ZnPg=="></img>

                    {/* Unit Testing icon */}
                    <img name="Test" onClick={this.openRightNav} className='icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOgSURBVGhD7Zk5aBRxGMVjPGIuNSKCeKAYFAvFRjxiYQQbGwmoBBGDR6GFwRQiCoohiJX3EQRboxiPQkHSBEQbiYUXHhER0niAwSRNxCTr75t9u7Iku5mZ/W9gYB48v5n3/96b+cjs7OxYFCNGjBjRRCKRKIZVEWKFTj0JhLKRkZFW2M92pMA5f4F13iBsXJL4F/ZGiH2p86astkF+SFjmTRYhcM7ndO4tdml50FqkwACH7Nyp1ws6CLFTYBUHKpXkFAUdhNAN8AbshsOKt4PZB7MFVqo1b5DlfhDCZsMHiksD7SdM3xHZfgv3szlL1tAgx+0g2CsIe2U51O/wJFwOS9RiB62G6UHZ7oP1Wg4F/G4HIeiaZVBfw/mSR4G1ctgA29U/BDdrOTDwuhsE60yC/sDk/dwn6D/jHTiReCkpMFwPssP8hHVK8gX6S2GvvFn/irmAz90ghDQr4rQk38DbYUbqVkmB4HqQK+anHpTkG3huybtLUiDgczrIZfNT90nyDTy35Q1198LndJBT5qcel+QbeJ7KWyspEPA5HWSP+amtknwBSzGeX/LOlRwI+JwOstL81C5JvkD/Kvk+SQoMvO4GwTrH/ITZd4nvh0N6j8j3WFJg4HX6F2kyP7UDlkseF/TWwH5oX6ShnrvwOh3krPmpTZJ8A89HeZdKCgR8TgfZbX5qJ1woOSdon0ZvLRyG9mQ8WUuBgNfpIJXwm2VQ30nOCfpqvIMCti9KDgy87gYxYF8MfxNoLzDG/ZzQ02jHpLZRpkoODPxuBzEQ9shyqA2SsoKe5+pNvsoJCfwFGWS75VC7KWWSR4H1LeqzL8PpkkOBDPeDEGHf1F2WRX0oOQPoS+CAeholhwYZ7gcxELjesqjPJGUAvVrrnymTJIcGOYUZhJiNlpVtEJYWaf2rpLwwEYM8kZQB9Hla75GUFwo2CIHnLYvaLikD6PbywW7R9tJhreTQIMPtIAStgPcth2pYp6VRYC31i3IAnmAz878HAgC/m0GwbSLkDvTeKFIHYc6frayX0HrX+g3s2wu8ZrhALb6B5/8g/DPkJfq8i9Bnz0kH4PukzQuyy6UNVqttXNBbB98owjLscrsHfV9y9KYGuWo7XhjVnmLt1U5W0rMX2q0zDfZ74FE2x/TkIr6d8CYcZD8N9u23/JieFOmphy/Ytv7DNsg2aL8JIgnO/QMl+TljZw28gGDXbiTI+dqlfAzO8IaIESNGjBgTj6KifxEFvzU5pO4HAAAAAElFTkSuQmCC" />


                  </div>
                </div>

                <div className="col-xs-11 col-md-11 col-lg-11" id="main" >
                  {/* NAME OF THE APPLICATION/ TOP NAVBAR AREA */}
                  <div className="row" >
                    <div className="col-xs-3 col-md-3 col-lg-3" style={{ paddingTop: '5px', marginBottom: '4px' }} >
                      <p className="text-center" >
                        <a style={{ fontSize: '20px', color: '#ffffff' }} >Workspace</a>
                      </p>
                    </div>
                    <div className="col-xs-3 col-md-3 col-lg-3" ></div>
                    <div className="col-xs-3 col-md-3 col-lg-3" >3</div>
                    <div className="col-xs-3 col-md-3 col-lg-3" >
                      <p className="text-center" >
                        <a style={{ color: '#ffffff' }} >Share room: {this.state.roomId}</a>
                      </p>
                    </div>

                  </div>

                  {/* HOLDS BOTH THE FIREPAD AND THE IFRAME */}
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ paddingLeft: '0px' }} >
                    <EditorHolder roomId={this.state.roomId} refId={this.state.refId} />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT NAVIGATION BAR */}
            <nav id="rightNav" className="rightNav">
              {this.state.clickedTab === 'github' ? <GithubNav close={this.closeRightNav} /> : ('')}

              {this.state.clickedTab === 'chat' ? <ChatNav close={this.closeRightNav} /> : ('')}
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
