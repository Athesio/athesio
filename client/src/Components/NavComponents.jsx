import React from 'react';
import GithubNav from './NavBarComponents/GithubNav.jsx';
import SlackNav from './NavBarComponents/SlackNav.jsx';

import MetisMenu from 'react-metismenu';






const NavComponents = (props) => {
  if (props.tab === 'Home') {
    return (
      <div id="HomeNav" >
          <h3 className="text-center" > Workspace </h3>
          <div className="fileBox text-center"  >
          <MetisMenu content={props.content}/>
          </div>
      </div>
    )
  } else if (props.tab === 'Github') {
    return <GithubNav/>
  } else if (props.tab === 'Slack') {
    return <SlackNav />
  } else if (props.tab === 'Test') {
    return <div>Test</div>
  }

}

export default NavComponents;