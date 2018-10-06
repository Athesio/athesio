import React, { Component } from 'react';
import Firepad from './Firepad.jsx';

const EditorHolder = (props) => {
  return (
    <div id="EditorBox" className="container" style={{ paddingRight: '0px' }} >
      {/* LEFT SIDE FIREPAD */}
      <div className="row">
        <div className="col-xs-12  col-sm-12 col-md-12 col-lg-6" id="Ace" >
          <div className='editor-container'>
            <Firepad roomId={props.roomId} refId={props.refId}/>
          </div>
        </div>
        {/* IFRAME FOR CODE EXECUTION */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" id='res' >
          <iframe className="resultBox"  >
          </iframe>
        </div>
      </div>
      <div className="row" >
        <div className="col-md-11 col-lg-11" >
          {/* <button type="button" >Save</button>  */}
        </div>
        <div className="col-md-1 col-lg-1" >
          <button type="button">Run</button>
        </div>
      </div>
    </div>
  );
};

export default EditorHolder;
