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
                <img className="handle" id="bubble" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwOC4xMzUsMTE4LjkyMWwtNjQuOTUtNTAuMDM0Yy0yLjA4NS0xLjYwNS00LjcyOS0yLjMxOC03LjMyOS0xLjk3OGMtMi42MDksMC4zMzktNC45NzYsMS42OTktNi41ODEsMy43ODIgICAgbC0zMS4yNDksNDAuNTY1VjE4LjgxMWMwLTUuNDc3LTQuNDM5LTkuOTE4LTkuOTE4LTkuOTE4SDExOC4xMjljLTIuNjMsMC01LjE1MiwxLjA0NS03LjAxNCwyLjkwNUwyLjkwNCwxMjAuMDA5ICAgIEMxLjA0NSwxMjEuODY3LDAsMTI0LjM5LDAsMTI3LjAyMXYzNjYuMTY5YzAsNS40NzcsNC40MzksOS45MTgsOS45MTgsOS45MThoMzc4LjE4OWM1LjQ3OSwwLDkuOTE4LTQuNDQxLDkuOTE4LTkuOTE4VjI3OC4xMTEgICAgTDUwOS45MzgsMTMyLjgzQzUxMy4yODEsMTI4LjQ5MSw1MTIuNDczLDEyMi4yNjQsNTA4LjEzNSwxMTguOTIxeiBNNDM4LjkzNiw5MC42NTRsMTYuNzYzLDEyLjkxMkwzMDYuNDAzLDI5Ny4zNzJsLTE2Ljc2My0xMi45MTIgICAgTDQzOC45MzYsOTAuNjU0eiBNMzE4LjA4MSwzMzEuNDA2bC0zMC45NjUsNy4yNTNsLTAuODg5LTMxLjc5TDMxOC4wODEsMzMxLjQwNnogTTEwOC4yMTEsNDIuNzU0djc0LjM1aC03NC4zNUwxMDguMjExLDQyLjc1NHogICAgIE0xOS44MzYsNDgzLjI3M1YxMzYuOTRoOTguMjkzYzUuNDc5LDAsOS45MTgtNC40NDEsOS45MTgtOS45MThWMjguNzI5aDI1MC4xNDJ2MTA4LjI3OEwyNjcuODc0LDI4MC4yMTEgICAgYy0xLjM5NSwxLjgxLTIuMTIxLDQuMDQ3LTIuMDU4LDYuMzNsMS44MSw2NC44MjVjMC4wODMsMi45NzgsMS41MDEsNS43NjIsMy44NjEsNy41OGMxLjc1MSwxLjM1LDMuODg1LDIuMDYyLDYuMDUzLDIuMDYyICAgIGMwLjc1NCwwLDEuNTE0LTAuMDg2LDIuMjYzLTAuMjYybDYzLjE0MS0xNC43OTJjMi4yMjQtMC41MjEsNC4yMDEtMS43OTQsNS41OTQtMy42MDRsMjkuNjQ5LTM4LjQ4OXYxNzkuNDEySDE5LjgzNnogICAgIE0zMzguODc5LDMyMi4zODhsLTE2Ljc2My0xMi45MTJMNDcxLjQxMSwxMTUuNjdsMTYuNzYxLDEyLjkxMkwzMzguODc5LDMyMi4zODh6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTkyLjcwMywyMDAuMjgzYzAtMjguNzA1LTIzLjM1Mi01Mi4wNTctNTIuMDU3LTUyLjA1N2MtMjguNzA0LDAtNTIuMDU2LDIzLjM1Mi01Mi4wNTYsNTIuMDU3ICAgIGMwLDI2LjAxLDE5LjE3Niw0Ny42MjYsNDQuMTMyLDUxLjQ1NGw3LjQ5Nyw3Ny40NjhjMC40OTYsNS4xMjcsNC44MTIsOC45NjMsOS44Niw4Ljk2M2MwLjMxOSwwLDAuNjQzLTAuMDE2LDAuOTY3LTAuMDQ2ICAgIGM1LjQ1Mi0wLjUyOCw5LjQ0NS01LjM3NSw4LjkxNi0xMC44MjhsLTcuMzg4LTc2LjM0OUMxNzUuNTQ3LDI0NS41MzgsMTkyLjcwMywyMjQuODg0LDE5Mi43MDMsMjAwLjI4M3ogTTE0MC42NDYsMjMyLjUwMyAgICBjLTE3Ljc2NiwwLTMyLjIyLTE0LjQ1NC0zMi4yMi0zMi4yMmMwLTE3Ljc2OCwxNC40NTUtMzIuMjIxLDMyLjIyLTMyLjIyMWMxNy43NjgsMCwzMi4yMjEsMTQuNDU0LDMyLjIyMSwzMi4yMjEgICAgQzE3Mi44NjgsMjE4LjA1LDE1OC40MTMsMjMyLjUwMywxNDAuNjQ2LDIzMi41MDN6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTE2LjM3LDI3MC43MjZINjMuNDc1Yy01LjQ3OSwwLTkuOTE4LDQuNDQxLTkuOTE4LDkuOTE4YzAsNS40NzcsNC40MzksOS45MTgsOS45MTgsOS45MThoNTIuODk1ICAgIGM1LjQ3OSwwLDkuOTE4LTQuNDQxLDkuOTE4LTkuOTE4QzEyNi4yODgsMjc1LjE2NiwxMjEuODQ5LDI3MC43MjYsMTE2LjM3LDI3MC43MjZ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjI0LjEyMSwyMjIuOTgxYy00LjA5NC0zLjYzOS0xMC4zNjQtMy4yNy0xNC4wMDEsMC44MjRsLTQyLjMxNiw0Ny42MDZjLTMuNjM5LDQuMDk0LTMuMjcsMTAuMzYyLDAuODI0LDE0LjAwMSAgICBjMS44OSwxLjY3OSw0LjI0MSwyLjUwNiw2LjU4NCwyLjUwNmMyLjczNi0wLjAwMSw1LjQ1OS0xLjEyNSw3LjQxNy0zLjMzbDQyLjMxNi00Ny42MDYgICAgQzIyOC41ODQsMjMyLjg4OCwyMjguMjE1LDIyNi42MiwyMjQuMTIxLDIyMi45ODF6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTU1LjA1LDM1Mi45ODdjLTUuMzI0LTEuMjc3LTEwLjY4MSwyLjAwNS0xMS45NTgsNy4zMjlsLTE1Ljg2OSw2Ni4xMTljLTEuMjc5LDUuMzI3LDIuMDAzLDEwLjY4MSw3LjMzLDExLjk1OCAgICBjMC43NzgsMC4xODYsMS41NTYsMC4yNzYsMi4zMjIsMC4yNzZjNC40ODIsMCw4LjU0NS0zLjA1Nyw5LjYzNi03LjYwNWwxNS44NjktNjYuMTE5ICAgIEMxNjMuNjU4LDM1OS42MTksMTYwLjM3NiwzNTQuMjY1LDE1NS4wNSwzNTIuOTg3eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NS40MSwzNjkuODI5bC03MS40MDktMzkuNjcyYy00Ljc5Mi0yLjY2Mi0xMC44MjYtMC45MzUtMTMuNDg3LDMuODUzYy0yLjY1OSw0Ljc4OC0wLjkzNSwxMC44MjYsMy44NTMsMTMuNDg2ICAgIGw3MS40MDksMzkuNjcyYzEuNTI2LDAuODQ4LDMuMTc4LDEuMjUsNC44MDgsMS4yNWMzLjQ4NiwwLDYuODY2LTEuODQxLDguNjc5LTUuMTAzICAgIEMyNjEuOTIxLDM3OC41MjgsMjYwLjE5OCwzNzIuNDksMjU1LjQxLDM2OS44Mjl6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
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