import React from 'react';

const ChatNav = (props) => {
  return (
    <div>
      <a href="javascript:void(0)" className="closebtn" onClick={props.close}>&times;</a>
      <a href="#">Chat</a>
      {/* <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a> */}
    </div>
  )
}

export default ChatNav;