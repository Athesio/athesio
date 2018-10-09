import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';


class FloatingVideoDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    console.log(this);
  }
  // eventLogger = (e: MouseEvent, data: Object) => {
  //   console.log('Event: ', e);
  //   console.log('Data: ', data);
  // };
 

  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[10, 10]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div id="floatingDiv" style={{ backgroundColor: 'white' }} >
          <div className="handle" id="floatingDivHeader" >Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    );
  }
}

 export default FloatingVideoDiv;
// ReactDOM.render(<FloatingVideoDiv/>, document.getElementById("TEST"));