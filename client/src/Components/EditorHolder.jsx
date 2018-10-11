import React, { Component } from 'react';
import Firepad from './Firepad.jsx';
import otherUsers from '../../fakeOtherUsers.js';


const EditorHolder = (props) => {
  return (
    <div id="EditorBox" className="container" style={{ paddingRight: '0px' }} >
      {/* LEFT SIDE FIREPAD */}
      <div className="row">
        <div className="col-xs-12  col-sm-6 col-md-6 col-lg-6" id="Ace" >
          <div className='editor-container'>
            <Firepad roomId={props.roomId} refId={props.refId} runCode={props.runCode} />
          </div>
        </div>
        {/* IFRAME FOR CODE EXECUTION */}
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" id='res' >
          <div className="resultBox">
            {props.code.split('\n').map((item, i)=> (<p key={i} style={{ marginBottom : '2px' }} > {item} </p>))}
            <a style={{ color: 'yellow' }} > > </a>
          </div>
        </div>
      </div>
      <div className="row" >
        <div className="col-md-11 col-lg-11" >
          <button type="button" onClick={props.handleSaveClick}>Save</button> 
        </div>
        <div className="col-xs-11 col-md-11 col-lg-11" id="userDiv" >
          {props.allUsers.map((user, i) => {
            if(props.user.login !== user.username){
              return (
                <a key={i} style={{ color: '#f1f1f1', paddingLeft: '10px', fontSize: '12px', float: 'right' }} className="joinedUsers" >
                  <img className="img-circle text-right" id="userImg" src={user.avatar_url} /> {user.username}
                </a>
              )
            }
          })
          }
        </div> 
      </div>
    </div>
  );
};

export default EditorHolder;
