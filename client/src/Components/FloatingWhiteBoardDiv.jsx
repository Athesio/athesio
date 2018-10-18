import React from 'react';
import Draggable from 'react-draggable';
import Message from './Message.jsx';
import WhiteBoard from './WhiteBoard.jsx';

class FloatingWhiteBoardDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: ''
    };

    this.updateMessageText = this.updateMessageText.bind(this);
    this.clearInputBox = this.clearInputBox.bind(this);
  }

  updateMessageText(newText) {
    this.setState({ currentMessage: newText });
  }

  clearInputBox() {
    this.updateMessageText('');
  }

  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 5, y: 5 }}
        position={null}
        grid={[10, 10]}
        bounds="parent"
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>

        <div id="floatingDiv">
          {this.props.miniStatus === true ?
            (
              <a>
                <img className="handle" id="bubble" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9Ii02MSAwIDUxMiA1MTIiIHdpZHRoPSIxNnB4Ij48cGF0aCBkPSJtMzc1IDYxaC03NXYtNDZjMC04LjI4NTE1Ni02LjcxNDg0NC0xNS0xNS0xNWgtMTgwYy04LjI4NTE1NiAwLTE1IDYuNzE0ODQ0LTE1IDE1djQ2aC03NWMtOC4yODUxNTYgMC0xNSA2LjcxNDg0NC0xNSAxNXY0MjFjMCA4LjI4NTE1NiA2LjcxNDg0NCAxNSAxNSAxNWgzNjBjOC4yODUxNTYgMCAxNS02LjcxNDg0NCAxNS0xNXYtNDIxYzAtOC4yODUxNTYtNi43MTQ4NDQtMTUtMTUtMTV6bS0yNTUtMzFoMTUwdjMxaC0xNTB6bTI0MCA0NTJoLTMzMHYtMzkxaDMzMHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTI1OS4zOTQ1MzEgMTkxLjYwNTQ2OWMyLjkyNTc4MSAyLjkyOTY4NyA2Ljc2NTYyNSA0LjM5NDUzMSAxMC42MDU0NjkgNC4zOTQ1MzFzNy42Nzk2ODgtMS40NjQ4NDQgMTAuNjA1NDY5LTQuMzk0NTMxYzUuODU5Mzc1LTUuODU5Mzc1IDUuODU5Mzc1LTE1LjM1NTQ2OSAwLTIxLjIxMDkzOGwtNDQuOTk2MDk0LTQ1Yy01LjgxMjUtNS44MTI1LTE1LjMzMjAzMS01Ljg4MjgxMi0yMS4yMTg3NSAwbC00NC45OTYwOTQgNDVjLTUuODU5Mzc1IDUuODU1NDY5LTUuODU5Mzc1IDE1LjM1MTU2MyAwIDIxLjIxMDkzOCA1Ljg1NTQ2OSA1Ljg1OTM3NSAxNS4zNTU0NjkgNS44NTkzNzUgMjEuMjEwOTM4IDBsMTkuMzk0NTMxLTE5LjM5MDYyNXYxMTMuNzg1MTU2YzAgNDMuNDUzMTI1LTI2LjU2MjUgODEuODMyMDMxLTY2LjAyNzM0NCA5Ny41NDI5NjktNy43ODkwNjItMTMuNDYwOTM4LTIyLjMzNTkzNy0yMi41NDI5NjktMzguOTcyNjU2LTIyLjU0Mjk2OS0yNC44MTI1IDAtNDUgMjAuMTg3NS00NSA0NXMyMC4xODc1IDQ1IDQ1IDQ1YzIyLjI0MjE4OCAwIDQwLjc1MzkwNi0xNi4yMjI2NTYgNDQuMzU1NDY5LTM3LjQ1MzEyNSA1My45MDIzNDMtMTguNjc1NzgxIDkwLjY0NDUzMS02OS42MDU0NjkgOTAuNjQ0NTMxLTEyNy41NDY4NzV2LTExMy43ODUxNTZ6bS0xNTQuMzk0NTMxIDIyOS4zOTQ1MzFjLTguMjY5NTMxIDAtMTUtNi43MzA0NjktMTUtMTVzNi43MzA0NjktMTUgMTUtMTUgMTUgNi43MzA0NjkgMTUgMTUtNi43MzA0NjkgMTUtMTUgMTV6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0yNjUuNjA1NDY5IDM2NS4zOTQ1MzFjLTUuODU1NDY5LTUuODU5Mzc1LTE1LjM1NTQ2OS01Ljg1OTM3NS0yMS4yMTA5MzggMC01Ljg1OTM3NSA1Ljg1OTM3NS01Ljg1OTM3NSAxNS4zNTU0NjkgMCAyMS4yMTA5MzhsMTkuMzkwNjI1IDE5LjM5NDUzMS0xOS4zOTA2MjUgMTkuMzk0NTMxYy01Ljg1OTM3NSA1Ljg1OTM3NS01Ljg1OTM3NSAxNS4zNTU0NjkgMCAyMS4yMTA5MzggNS44NTU0NjkgNS44NTkzNzUgMTUuMzU1NDY5IDUuODU5Mzc1IDIxLjIxMDkzOCAwbDE5LjM5NDUzMS0xOS4zOTA2MjUgMTkuMzk0NTMxIDE5LjM5MDYyNWM1Ljg1NTQ2OSA1Ljg1OTM3NSAxNS4zNTU0NjkgNS44NTkzNzUgMjEuMjEwOTM4IDAgNS44NTkzNzUtNS44NTU0NjkgNS44NTkzNzUtMTUuMzUxNTYzIDAtMjEuMjEwOTM4bC0xOS4zOTA2MjUtMTkuMzk0NTMxIDE5LjM5MDYyNS0xOS4zOTQ1MzFjNS44NTkzNzUtNS44NTkzNzUgNS44NTkzNzUtMTUuMzU1NDY5IDAtMjEuMjEwOTM4LTUuODU1NDY5LTUuODU5Mzc1LTE1LjM1MTU2My01Ljg1OTM3NS0yMS4yMTA5MzggMGwtMTkuMzk0NTMxIDE5LjM5MDYyNXptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTY0LjM5NDUzMSAzMjYuNjA1NDY5YzUuODU1NDY5IDUuODU5Mzc1IDE1LjM1NTQ2OSA1Ljg1OTM3NSAyMS4yMTA5MzggMGwxOS4zOTQ1MzEtMTkuMzkwNjI1IDE5LjM5NDUzMSAxOS4zOTA2MjVjNS44NTU0NjkgNS44NTkzNzUgMTUuMzU1NDY5IDUuODU5Mzc1IDIxLjIxMDkzOCAwIDUuODU5Mzc1LTUuODU1NDY5IDUuODU5Mzc1LTE1LjM1MTU2MyAwLTIxLjIxMDkzOGwtMTkuMzkwNjI1LTE5LjM5NDUzMSAxOS4zOTA2MjUtMTkuMzk0NTMxYzUuODU5Mzc1LTUuODU5Mzc1IDUuODU5Mzc1LTE1LjM1NTQ2OSAwLTIxLjIxMDkzOC01Ljg1NTQ2OS01Ljg1OTM3NS0xNS4zNTE1NjMtNS44NTkzNzUtMjEuMjEwOTM4IDBsLTE5LjM5NDUzMSAxOS4zOTA2MjUtMTkuMzk0NTMxLTE5LjM5MDYyNWMtNS44NTU0NjktNS44NTkzNzUtMTUuMzU1NDY5LTUuODU5Mzc1LTIxLjIxMDkzOCAwLTUuODU5Mzc1IDUuODU1NDY5LTUuODU5Mzc1IDE1LjM1MTU2MyAwIDIxLjIxMDkzOGwxOS4zOTA2MjUgMTkuMzk0NTMxLTE5LjM5MDYyNSAxOS4zOTQ1MzFjLTUuODU5Mzc1IDUuODU1NDY5LTUuODU5Mzc1IDE1LjM1NTQ2OSAwIDIxLjIxMDkzOHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+Cg==" />
                <br /><em onClick={this.props.minimize} style={{ color: "#f1f1f1", cursor: "pointer" }} >Draw</em>
              </a>
            )
            :
            (
              <div className="floating-div-container">
                 <div id="fdh" >
                    <div id="floatingDivHeader" className="handle" >
                      WhiteBoard
                    </div>
                    <div className="exitChat" onClick={this.props.minimize}>
                      X
                    </div>
                  </div>
                  < WhiteBoard socket={this.props.socket} sendNewImage={this.props.sendNewImage}/>
              </div>
            )
          }
        </div>
      </Draggable>
    );
  }
}

export default FloatingWhiteBoardDiv;