import React from 'react';
import Draggable from 'react-draggable';
import Message from './Message.jsx';

class FloatingChatDiv extends React.Component {
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
                <img className="handle" id="bubble" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAP1SURBVGhD7VpdiIxRGP78/845u4uk5L9cyAWSSz9ZkdyIC6KkSMrFKmWlKJS4kqVc+EloQxIlUSZzZhbtkuSCZNvFrmjtfN8uIex43m9f+83OvsPMmJk9F/PU0zft9/4855z3/M2sU0IJJRQeXbecYXGjF7lGVXtGXfGi6rEb1R/BH15UJ7qpPoPNYBg85Rm92YuGZnKI/kMi4Qz0YqGVEFQL8R2B4OzoGv0CMQ7F7+upHLo4SDx3hroRtR292igJy5Vo0C+M4E00aC6nKhw8E1qB3nslCckX0aAuPC92Phg1ntPmDx/C40aj/s+mJi0k0aC2eEyvYQn/DzeqpqMRz6RkhSaNDvIfTVx2BrGc3NBpymehbt9LSYrMS4mwM5hlZQe3Ts2gJVQI2j80+gJWygEsLzNgSMsLPalzotEHWWJmgEOtGKifSXMmHtWLWebfAeO1UhB7qJpbGiaMZLky6KgBw9dyAHuIVXQvS5aBYdsiOdpHFae9jWX3BQyeyo72EfvLNpbdG511ZbMlB1uJhhiW3huou92Sg63EHvcTe10Fyw+AFl6THGwmOr+S5QdAC19KxukI+1bcQzzpXTKR7B3mXqf0rjfVG8T7Ir9LyyqWHwBBXMFQJEZvD/l01U0cAaHXJRsirYJk1/awQiH+PcnG3+SMXk12HeHRY9Ggx5KdROQ+Qn69IBmKRK/R7ZDdHDem5qexa2ITH/5dRrZ7wiY+vEhoo2gn0eiT7BYApfJNNE4hTbLkSw/1pmQHgR3Jaz16fqtkh15toVsnm9GiUy3ZpeFxdgsAgRkf12H70O9h9B4JkWy6qe6iDJf5G63Rn2QbiqeuIU4lnjsym089PMDyA/jiZGObuYnlB8AfT6QYWU+U6zyWHwBDu14ytpYoVfEKTEskyuur6GQhofU8S+8LGFxOdbCVHZGyhSy7L6jmJCfrmLL3iMASeEN0tojo8KUsNz3aTfmkLNfy4tKoqyz137D1pogJ3uo9Co1hmZmBzjFSsH4jnYwjoQUsL3PQGk3DKAYtMjEnvnumbBVLyx7UGEz+c1LwYtHf22KhlSwpd9DXlAi40+8VIVFhqRrjMT2HpeQHdIqVkxWGODKdQeeVc/r8wY2o5VLCvNPoeozCEk6bf6B3jomJ80DEpl+p7tCEzvob92yQCDvD/TVcEJEraRKjfCL4vAsNmcapCouMNkijb8cf6ClUFt0/lurD4Ak6pWJ+ncbnGjz3edHQBrrnJxqcIRy+OKB7N/aTtz2CU8hlUZN877YSGP4jqeJ7aFQT3bXZ1F5QCaA0kv574U8DdD1GYqv1o/AHEF2FTekUnjUQvx+1v649VjaZX5dQQlo4zm8qYCSPs2JQPQAAAABJRU5ErkJggg=="/>
                <br /><em onClick={this.props.minimize} style={{ color: "#f1f1f1", cursor: "pointer" }} >Chat</em>
              </a>
            )
            :
            (
              <div className="floating-div-container">
                <div id="fdh" >
                  <div id="floatingDivHeader" className="handle" >
                    Chat
                  </div>
                <div className="exitChat" onClick={this.props.minimize}>
                  X
                </div>
              </div>
                <div className="floatingDivContent" style={{ overflow: 'scroll'}}>
                  {
                    this.props.messages.map((message, i) => {
                      return (<Message  message={message} key={i} user={this.props.user} />);
                    })
                  }
                </div>
                <div className="row" >
                  <div className="text-center" style={{ padding: '0px', width: '100%' }} >
                    <input 
                      type="text" 
                      name="chatInput"
                      value={this.state.currentMessage}
                      onChange={(e) => this.updateMessageText(e.target.value)}
                    />
                      <button 
                        onClick={() => this.props.sendNewMessage(this.state.currentMessage, this.clearInputBox)}
                      > Send </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Draggable>
    );
  }
}

export default FloatingChatDiv;