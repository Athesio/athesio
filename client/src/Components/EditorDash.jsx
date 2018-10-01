import React from 'react';
import EditorHolder from './EditorHolder.jsx';
import UserNav from './DashUserNav.jsx';
import GithubNav from './DashGithubNav.jsx';
import ChatNav from './ChatNav.jsx';
import otherUsers from '../../fakeOtherUsers.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedTab: '',
      tabs : ['GitHub', 'Comm']
    }
  }
  componentDidMount() {

  }

  openNav() {
    document.getElementById("userNav").style.width = "30%";
    document.getElementById("Editor").style.marginLeft = "30%";
  }

  closeNav() {
    document.getElementById("userNav").style.width = "0";
    document.getElementById("Editor").style.marginLeft = "0";
  }

  openRightNav(e) {
    let tab = e.target.className.split("Span")[0];
    if (tab === 'github'){
      this.setState({clickedTab: 'github'});
    } else {
      this.setState({clickedTab: 'chat'});
    }
    console.log(this.state.clickedTab);
    document.getElementById("rightNav").style.width = "30%";
    document.getElementById("Editor").style.marginRight = "30%";
  }

  closeRightNav() {
    document.getElementById("rightNav").style.width = "0";
    document.getElementById("Editor").style.marginRight = "0";
  }


  render() {
    return (
      <div className="wrapper">
        {/* USER NAVIGATION BAR */}
        <nav id="userNav" className="sidenav">
          <UserNav close={this.closeNav.bind(this)} /> 
        </nav>
        <span className="userSpan" onClick={this.openNav}>&#9776;</span>
        
        {/* MIDDLE SECTION OF DASHBOARD */}
        <div id="Editor" className="container" >
          
        {/* NAME OF THE APPLICATION */}
        <div className="row" >
          <div className="col-md-12" >
            <h2 style={{ fontSize : '60px' }} >ATHESIO</h2>
          </div>
        </div>

        {/* SHOWS USERS IN THE SESSION */}
        <div  className="row">
          <div className="col-xs-6 col-md-6" ></div>
          <div className="col-xs-6 col-md-6" id="userDiv" >
            {otherUsers.map((user, i) => {
              return (
                <a  key={i} style={{ color: '#f1f1f1', padding: '10px', fontSize: '10px', float: 'right'}} className="joinedUsers" >
                  <img className="img-circle text-right" id="userImg" src={user.img} /> {user.username}
                </a>
              )
            })
            }
          </div>
        </div>

        {/* HOLDS BOTH THE FIREPAD AND THE IFRAME */}
        <div className="row" >
          <div className="col-md-12" >
            <EditorHolder />
          </div>
        </div>
        <span className="githubSpan" name="Github" onClick={this.openRightNav.bind(this)}>GitHub</span>
        <span className="chatSpan" name="Chat" onClick={this.openRightNav.bind(this)}>Chat</span>
        </div>
        
        {/* RIGHT NAVIGATION BAR */}
        <nav id="rightNav" className="rightNav">
          {this.state.clickedTab === 'github' ? <GithubNav close={this.closeRightNav.bind(this)}/>  : ('')}
          
          {this.state.clickedTab === 'chat' ? <ChatNav close={this.closeRightNav.bind(this)} /> : ('')}
        </nav>
      </div>
    )
  }
}

export default Dashboard;