import React from 'react';

const UserNav = (props) => {
  return (
    <div>
      <a href="javascript:void(0)" className="closebtn" onClick={props.close}>&times;</a>

      <a className="text-center" ><img className="img-circle " id="currUser" src={props.user.img} /></a>
      <em>Welcome back, </em>
      <h3 className="text-center" id="currUsername" >{props.user.username}</h3>
    </div>
  )
}

export default UserNav;