import React from 'react';
import GithubNav from './GithubNav.jsx';

const NavComponents = (props) => {
  if (props.tab === 'Home') {
    return (
      <div className="row" >
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <div className="text-center" style={{ backgroundColor: 'black', paddingLeft: '0px' }} >Hi</div>
        </div>
      </div>
    )
  } else if (props.tab === 'Github') {
    return <GithubNav />
  } else if (props.tab === 'Slack') {
    return <div>SLACK</div>
  } else if (props.tab === 'Test') {
    return <div>Test</div>
  }

}

export default NavComponents;