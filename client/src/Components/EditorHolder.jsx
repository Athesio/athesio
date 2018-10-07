import React, { Component } from 'react';
import Firepad from './Firepad.jsx';
import otherUsers from '../../fakeOtherUsers.js';


const EditorHolder = (props) => {
  return (
    <div id="EditorBox" className="container" style={{ paddingRight: '0px' }} >
      {/* LEFT SIDE FIREPAD */}
      <div className="row">
        <div className="col-xs-12  col-sm-12 col-md-6 col-lg-6" id="Ace" >
          <div className='editor-container'>
            <Firepad roomId={props.roomId} refId={props.refId} />
          </div>
        </div>
        {/* IFRAME FOR CODE EXECUTION */}
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" id='res' >
          <iframe className="resultBox"  >
          </iframe>
        </div>
      </div>
      <div className="row" >
      <div className="col-md-1 col-lg-1" id='runBtn' >
          <button type="button">Run</button>
        </div>
        <div className="col-xs-11 col-md-11 col-lg-11" id="userDiv" >
          {otherUsers.map((user, i) => {
            return (
              <a key={i} style={{ color: '#f1f1f1', paddingLeft: '10px', fontSize: '12px', float: 'right' }} className="joinedUsers" >
                <img className="img-circle text-right" id="userImg" src={user.img} /> {user.username}
              </a>
            )
          })
          }
        </div>
        
      </div>
    </div>
  );
};

export default EditorHolder;
