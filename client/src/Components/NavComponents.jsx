import React from 'react';
import GithubNav from './NavBarComponents/GithubNav.jsx';
import SlackNav from './NavBarComponents/SlackNav.jsx';
import TreeMenu from './TreeMenu.jsx';

const NavComponents = (props) => {
  if (props.tab === 'Home') {
    return props.contentLoaded ? (
      <div id="HomeNav" >
          <h3 className="text-center" > Workspace </h3>
          <div className="fileBox"  >
          <TreeMenu roomId={props.roomId} user={props.user} socket={props.socket} data={props.content} handleFileClick={props.handleFileClick}/>
          </div>
      </div>
    ) : (
        <div className="fileBox" style={{ backgroundColor: '#1e1f21' }} >
          <img src="https://i2.wp.com/merakidezain.com/wp-content/themes/snskanta/assets/img/prod_loading.gif?w=660" alt="" />
        </div>
    );
  } else if (props.tab === 'Github') {
    return <GithubNav/>
  } else if (props.tab === 'Slack') {
    return <SlackNav />
  } else if (props.tab === 'Test') {
    return <div>Test</div>
  }

}

export default NavComponents;