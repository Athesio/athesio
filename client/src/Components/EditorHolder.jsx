import React, { Component } from 'react';
import Firepad from './Firepad.jsx';
import otherUsers from '../../fakeOtherUsers.js';
import { Button } from 'reactstrap';



const EditorHolder = (props) => {
  return (
    <div id="githubEditorHolder" >

      {props.githubMode ?
        <div id="GHAce" >
          <Firepad 
            roomId={props.roomId} 
            refId={props.refId} 
            runCode={props.runCode} 
            toggleGistModal={props.toggleGistModal} 
            handleSaveClick={props.handleSaveClick} 
            githubMode={props.githubMode}
            repoFirepadCode={props.repoFirepadCode}
            />          
        </div>
        :
        // {/* LEFT SIDE FIREPAD */}
        <div id="EditorBox" >
          <div className="col-xs-12  col-sm-6 col-md-6 col-lg-6" id="Ace" >
            <div className='editor-container'>
              <Firepad 
                roomId={props.roomId} 
                refId={props.refId} 
                runCode={props.runCode} 
                toggleGistModal={props.toggleGistModal} 
                handleSaveClick={props.handleSaveClick} 
                githubMode={props.githubMode}
                />
            </div>
          </div>
          {/* // IFRAME FOR CODE EXECUTION */}
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" id='res' >
            <div className="resultBox">
              {props.code.split('\n').map((item, i) => (<p key={i} style={{ marginBottom: '2px' }} > {item} </p>))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default EditorHolder;
