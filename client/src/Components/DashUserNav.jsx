import React from 'react';

const UserNav = (props) => {
  return (
    <div>
      <a href="javascript:void(0)" className="closebtn" onClick={props.close}>&times;</a>
      <a href="#">User</a>
      {/* <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a> */}
    </div>
  )
}

export default UserNav;