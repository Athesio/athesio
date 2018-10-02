import React from 'react';

const GithubNav = (props) => {
  return (
    <div>
      <a href="javascript:void(0)" className="closebtn" onClick={props.close}>&times;</a>
      {/* < h2>Github</h2> */}
      <a className="text-center"><img src="Github.png" alt="GHLogo" style={{ height: '80px', width: '80px' }} /></a>
      <a href="https://developer.github.com/enterprise/2.14/v3/enterprise-admin/orgs/">Create an Organization</a>
      <a href="https://developer.github.com/v3/repos/">Manage Repos</a>
      <a href="https://developer.github.com/v3/repos/contents/">Add File</a>
    </div>
  )
}

export default GithubNav;