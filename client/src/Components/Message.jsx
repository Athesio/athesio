import React, { Component } from 'react';
import moment from 'moment';

const Message = (props) => {
  console.log('current message: ', props);
  return (
    <div className='message-container' style={{ overflow: 'scroll' }}>
      {props.message.user.login === props.user.login ?
        (<div className='user-message'>
          <p>{props.message.text}</p>
          <p>{moment(props.message.createTime).fromNow()}</p>
          <p>{props.message.user.login}</p>
        </div>) :
        (<div className='other-user-message'>
          <p>{props.message.text}</p>
          <p>{moment(props.message.createTime).fromNow()}</p>
          <p>{props.message.user.login}</p>
        </div>)
      }
    </div> 
  );
};

export default Message;
