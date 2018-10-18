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
                <img className="handle" id="bubble" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9Ii0yOSAwIDUxMiA1MTIiIHdpZHRoPSIxNnB4Ij48cGF0aCBkPSJtMTkuMDE1NjI1IDM3MS45NzI2NTZoODIuMzA0Njg3djUuMzg2NzE5YzAgMTEuNDIxODc1IDkuMjkyOTY5IDIwLjcxNDg0NCAyMC43MTQ4NDQgMjAuNzE0ODQ0aDExLjMxNjQwNmwtMzQuMzIwMzEyIDk0LjI5Njg3NWMtMy40Njg3NSA5LjUyNzM0NCAzLjYwMTU2MiAxOS42Mjg5MDYgMTMuNzQyMTg4IDE5LjYyODkwNmgzMi4zMjAzMTJjNi4xMjUgMCAxMS42NDg0MzgtMy44NjcxODggMTMuNzQyMTg4LTkuNjI1bDM3Ljk2NDg0My0xMDQuMzAwNzgxaDEwLjk1NzAzMWM0LjE0NDUzMiAwIDcuNTAzOTA3LTMuMzU5Mzc1IDcuNTAzOTA3LTcuNSAwLTQuMTQ0NTMxLTMuMzU5Mzc1LTcuNS03LjUwMzkwNy03LjUtMTguODYzMjgxIDAtNjkuMjUzOTA2IDAtODUuNzIyNjU2IDAtMy4xNTIzNDQgMC01LjcxNDg0NC0yLjU2MjUtNS43MTQ4NDQtNS43MTQ4NDR2LTUuMzg2NzE5aDIyMS4zNzV2NS4zODY3MTljMCAzLjE1MjM0NC0yLjU2MjUgNS43MTQ4NDQtNS43MTQ4NDMgNS43MTQ4NDQtOS4xNzU3ODEgMC03OC4xMjUgMC04OS4yMTg3NSAwLTQuMTQ0NTMxIDAtNy41IDMuMzU1NDY5LTcuNSA3LjUgMCA0LjE0MDYyNSAzLjM1NTQ2OSA3LjUgNy41IDcuNWgxNC40NTMxMjVsMzcuOTY0ODQ0IDEwNC4zMDA3ODFjMi4wOTM3NSA1Ljc1NzgxMiA3LjYxNzE4NyA5LjYyNSAxMy43NDIxODcgOS42MjVoMzIuMzIwMzEzYzEwLjE0MDYyNCAwIDE3LjIxMDkzNy0xMC4xMDE1NjIgMTMuNzQyMTg3LTE5LjYyODkwNmwtMzQuMzIwMzEzLTk0LjI5Njg3NWgxMS4zMTY0MDdjMTEuNDIxODc1IDAgMjAuNzE0ODQzLTkuMjkyOTY5IDIwLjcxNDg0My0yMC43MTQ4NDR2LTUuMzg2NzE5aDgyLjMwNDY4OGMxMC40ODQzNzUgMCAxOS4wMTU2MjUtOC41MzEyNSAxOS4wMTU2MjUtMTkuMDE1NjI1di0yMS41ODk4NDNjMC05LjUwMzkwNy03LjAxNTYyNS0xNy4zNzg5MDctMTYuMTM2NzE5LTE4Ljc3MzQzOHYtMTA5LjEwNTQ2OWMwLTQuMTQ0NTMxLTMuMzU5Mzc1LTcuNS03LjUtNy41LTQuMTQ0NTMxIDAtNy41IDMuMzU1NDY5LTcuNSA3LjV2MTA4Ljg2MzI4MWgtMzkxLjc0MjE4N3YtMjUyLjczMDQ2OGgzOTEuNzQyMTg3djEwOC44NjMyODFjMCA0LjE0NDUzMSAzLjM1OTM3NSA3LjUgNy41MDM5MDYgNy41IDQuMTQwNjI2IDAgNy41LTMuMzU1NDY5IDcuNS03LjV2LTEwOS4xMDU0NjljOS4xMjEwOTQtMS4zOTQ1MzEgMTYuMTM2NzE5LTkuMjY5NTMxIDE2LjEzNjcxOS0xOC43NzM0Mzd2LTIxLjU4OTg0NGMwLTEwLjQ4NDM3NS04LjUzMTI1LTE5LjAxNTYyNS0xOS4wMTk1MzEtMTkuMDE1NjI1aC00MTUuOTg0Mzc1Yy0xMC40ODQzNzUgMC0xOS4wMTU2MjUgOC41MzEyNS0xOS4wMTU2MjUgMTkuMDE1NjI1djIxLjU4OTg0NGMwIDkuNTAzOTA2IDcuMDE1NjI1IDE3LjM3ODkwNiAxNi4xMzY3MTkgMTguNzczNDM3djI1My4yMTQ4NDRjLTkuMTIxMDk0IDEuMzk0NTMxLTE2LjEzNjcxOSA5LjI2OTUzMS0xNi4xMzY3MTkgMTguNzczNDM4djIxLjU4OTg0M2MwIDEwLjQ4NDM3NSA4LjUzMTI1IDE5LjAxNTYyNSAxOS4wMTU2MjUgMTkuMDE1NjI1em0xNjEuODI0MjE5IDI2LjEwMTU2My0zNi4wMDc4MTMgOTguOTI1NzgxaC0zMS41MTk1MzFsMzYuMDAzOTA2LTk4LjkyNTc4MXptMTU5Ljg2NzE4NyA5OC45MjU3ODFoLTMxLjUxOTUzMWwtMzYuMDA3ODEyLTk4LjkyNTc4MWgzMS41MTk1MzF6bS0zMjUuNzA3MDMxLTQ3Ny45ODQzNzVjMC0yLjE3NTc4MSAxLjgzOTg0NC00LjAxNTYyNSA0LjAxNTYyNS00LjAxNTYyNWg0MTUuOTg4MjgxYzIuMTc1NzgyIDAgNC4wMTU2MjUgMS44Mzk4NDQgNC4wMTU2MjUgNC4wMTU2MjV2MjEuNTg5ODQ0YzAgMi4xNzU3ODEtMS44Mzk4NDMgNC4wMTU2MjUtNC4wMTU2MjUgNC4wMTU2MjUtNC40NDkyMTggMC00MTEuMzAwNzgxIDAtNDE1Ljk4ODI4MSAwLTIuMTc1NzgxIDAtNC4wMTU2MjUtMS44Mzk4NDQtNC4wMTU2MjUtNC4wMTU2MjV6bTAgMzEyLjM1MTU2M2MwLTIuMTc1NzgyIDEuODM5ODQ0LTQuMDE1NjI2IDQuMDE1NjI1LTQuMDE1NjI2aDQxNS45ODgyODFjMi4xNzU3ODIgMCA0LjAxNTYyNSAxLjgzOTg0NCA0LjAxNTYyNSA0LjAxNTYyNnYyMS41ODk4NDNjMCAyLjE3NTc4MS0xLjgzOTg0MyA0LjAxNTYyNS00LjAxNTYyNSA0LjAxNTYyNWgtODkuODA0Njg3Yy0zLjU1MDc4MSAwLTMxNy45ODA0NjkgMC0zMjYuMTgzNTk0IDAtMi4xNzU3ODEgMC00LjAxNTYyNS0xLjgzOTg0NC00LjAxNTYyNS00LjAxNTYyNXptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTEzOC4zMTY0MDYgOTMuMTk1MzEyYy0xNy45MDIzNDQgMC0zMi40NjQ4NDQgMTQuNTYyNS0zMi40NjQ4NDQgMzIuNDY0ODQ0czE0LjU2MjUgMzIuNDY0ODQ0IDMyLjQ2NDg0NCAzMi40NjQ4NDQgMzIuNDY0ODQ0LTE0LjU2MjUgMzIuNDY0ODQ0LTMyLjQ2NDg0NC0xNC41NjI1LTMyLjQ2NDg0NC0zMi40NjQ4NDQtMzIuNDY0ODQ0em0wIDQ5LjkyOTY4OGMtOS42Mjg5MDYgMC0xNy40NjQ4NDQtNy44MzU5MzgtMTcuNDY0ODQ0LTE3LjQ2NDg0NHM3LjgzNTkzOC0xNy40NjQ4NDQgMTcuNDY0ODQ0LTE3LjQ2NDg0NCAxNy40NjQ4NDQgNy44MzU5MzggMTcuNDY0ODQ0IDE3LjQ2NDg0NC03LjgzNTkzOCAxNy40NjQ4NDQtMTcuNDY0ODQ0IDE3LjQ2NDg0NHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTI1Ny4yNSAyNDYuMzEyNWMwIDE3LjkwMjM0NCAxNC41NjY0MDYgMzIuNDY0ODQ0IDMyLjQ2NDg0NCAzMi40NjQ4NDQgMTcuOTAyMzQ0IDAgMzIuNDY0ODQ0LTE0LjU2MjUgMzIuNDY0ODQ0LTMyLjQ2NDg0NHMtMTQuNTYyNS0zMi40NjQ4NDQtMzIuNDY0ODQ0LTMyLjQ2NDg0NC0zMi40NjQ4NDQgMTQuNTYyNS0zMi40NjQ4NDQgMzIuNDY0ODQ0em00OS45Mjk2ODggMGMwIDkuNjI4OTA2LTcuODMyMDMyIDE3LjQ2NDg0NC0xNy40NjQ4NDQgMTcuNDY0ODQ0LTkuNjI4OTA2IDAtMTcuNDY0ODQ0LTcuODM1OTM4LTE3LjQ2NDg0NC0xNy40NjQ4NDRzNy44MzU5MzgtMTcuNDY0ODQ0IDE3LjQ2NDg0NC0xNy40NjQ4NDRjOS42MzI4MTIgMCAxNy40NjQ4NDQgNy44MzU5MzggMTcuNDY0ODQ0IDE3LjQ2NDg0NHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTE2NC4yMTg3NSAyMjAuNDEwMTU2Yy0yLjkyOTY4OC0yLjkyOTY4Ny03LjY3OTY4OC0yLjkyOTY4Ny0xMC42MDkzNzUgMGwtMTUuMjkyOTY5IDE1LjI5Mjk2OS0xNS4yOTI5NjgtMTUuMjkyOTY5Yy0yLjkyOTY4OC0yLjkyOTY4Ny03LjY3NTc4Mi0yLjkyOTY4Ny0xMC42MDU0NjkgMC0yLjkyOTY4OCAyLjkyOTY4OC0yLjkyOTY4OCA3LjY3OTY4OCAwIDEwLjYwOTM3NWwxNS4yOTI5NjkgMTUuMjkyOTY5LTE1LjI5Mjk2OSAxNS4yOTI5NjljLTIuOTI5Njg4IDIuOTI5Njg3LTIuOTI5Njg4IDcuNjc5Njg3IDAgMTAuNjA1NDY5IDIuOTI5Njg3IDIuOTI5Njg3IDcuNjc1NzgxIDIuOTI5Njg3IDEwLjYwNTQ2OSAwbDE1LjI5Mjk2OC0xNS4yOTI5NjkgMTUuMjkyOTY5IDE1LjI5Mjk2OWMyLjkyOTY4NyAyLjkyOTY4NyA3LjY3OTY4NyAyLjkyOTY4NyAxMC42MDkzNzUgMCAyLjkyOTY4OC0yLjkyNTc4MiAyLjkyOTY4OC03LjY3NTc4MiAwLTEwLjYwNTQ2OWwtMTUuMjkyOTY5LTE1LjI5Mjk2OSAxNS4yOTI5NjktMTUuMjkyOTY5YzIuOTI1NzgxLTIuOTI5Njg3IDIuOTI1NzgxLTcuNjc5Njg3IDAtMTAuNjA5Mzc1em0wIDAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJtMzQzLjU4OTg0NCAxMDkuMjg5MDYyLTM3LjY3MTg3NS0yMy4wNTA3ODFjLTYuNjAxNTYzLTQuMDM5MDYyLTE0LjgzMjAzMS45NzY1NjMtMTQuODMyMDMxIDguOTg0Mzc1djE2LjAyMzQzOGMtMzYuMDk3NjU3IDMuNDY4NzUtNjguNDQ1MzEzIDIwLjA4OTg0NC05My44NjMyODIgNDguMzI4MTI1LTIwLjEyNSAyMi4zNTU0NjktMjguODAwNzgxIDQzLjk1MzEyNS0yOS4xNjAxNTYgNDQuODU5Mzc1LTEuNTIzNDM4IDMuODUxNTYyLjM2MzI4MSA4LjIxMDkzNyA0LjIxODc1IDkuNzM0Mzc1IDMuODQzNzUgMS41MjM0MzcgOC4yMDcwMzEtLjM1OTM3NSA5LjczMDQ2OS00LjIxNDg0NC4zMDQ2ODctLjc3MzQzNyAzMC42Nzk2ODctNzUuMjYxNzE5IDEwOS4wNzQyMTktODMuNjMyODEzdjE1LjAwMzkwN2MwIDguMDA3ODEyIDguMjI2NTYyIDEzLjAyMzQzNyAxNC44MzIwMzEgOC45ODQzNzVsMzcuNjcxODc1LTIzLjA1NDY4OGM2LjUxNTYyNS0zLjk4ODI4MSA2LjUyNzM0NC0xMy45NjQ4NDQgMC0xNy45NjQ4NDR6bS0zNy41MDM5MDYgMjMuMzI4MTI2di0yOC42ODc1bDIzLjQ0MTQwNiAxNC4zNDM3NXptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+Cg==" />
                <br /><em onClick={this.props.minimize} style={{ color: "#f1f1f1", cursor: "pointer" }} >Draw</em>
              </a>
            )
            :
            (
              <div className="floating-div-container">
               <div id="floatingDivHeader" className="handle" >
                    WhiteBoard
                  </div>
                < WhiteBoard />
                </div>
            )
          }
        </div>
      </Draggable>
    );
  }
}

export default FloatingWhiteBoardDiv;