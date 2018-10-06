import React from 'react';

const UserNav = (props) => {
  return (
    <div>
      <a className="text-center" ><img className="img-circle " id="currUser" /></a>
      <em style={{ color: '#f1f1f1', paddingLeft: '10px'}} >Welcome back, </em>
      <h3 className="text-center" id="currUsername" ></h3>
      {/* <h3 className="text-center" id="currUsername" >{props.user.username}</h3> */}
      <div className="text-center" >
        <button type="button" id="LogoutBtn" > LOG OUT</button>

      </div>

    </div>
  )
}

export default UserNav;