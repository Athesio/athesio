import React, { Component } from 'react';
import moment from 'moment';

const Message = (props) => {
  return (
    <div className='message-container'>
      {props.message.user.login === props.user.login ?
        ( <div className='user-message'>
            <div className='message-text-div'>{props.message.text}</div>
            <div className='timestamp-user-text-container text-right'>
              <div className='name-div'>{props.message.user.login}</div>
              <div className='timestamp-div'>{moment(props.message.createTime).fromNow()}</div>
            </div>
          </div>
        ) :
        (
          <div className='other-user-message'>
              <div className='message-text-div'>{props.message.text}</div>
              <div className='timestamp-user-text-container text-left'>
                <div className='name-div'>{props.message.user.login}</div>
                <div className='timestamp-div'>{moment(props.message.createTime).fromNow()}</div>
              </div>
            </div>
        )
      }
    </div>
  );
};

export default Message;
