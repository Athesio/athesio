import React, { Component } from 'react';
import Firepad from './Firepad.jsx';

const EditorHolder = (props) => {
  return (
    <div id="EditorBox" className="container" >
      {/* LEFT SIDE FIREPAD */}
      <div className="row">
        <div className="col-xs-12  col-sm-12 col-md-12 col-lg-6" id="Ace" >
          <div className='editor-container'>
            <Firepad roomId={props.roomId} />
          </div>
        </div>
        {/* IFRAME FOR CODE EXECUTION */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" id='res' >
          <iframe className="resultBox"  >
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default EditorHolder;
