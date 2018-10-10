import React from 'react';
import Draggable from 'react-draggable';


class FloatingVideoDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[10, 10]}
        bounds="parent"
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>

        <div id="floatingDiv" style={{ backgroundColor: 'white' }} >
          {this.props.miniStatus === true ?
            (
              <img onClick={this.props.minimize} className="handle" id="bubble" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAO5SURBVGhD7VlLaBNRFB3/0ibvJYVSi4IifvG30oXoUkEFURD/uLM7RSmIWz/7Lv0suhAXKogotCIUYjMziZR0Ywsqgi5URKrJTFKhrdLxvOmtpJnXZiaZTxY5cGjKu7n33Jn77vtEaaKJJqKFofKkNaosp38bH6Vsa4epJi4YKus1VT5kqsw0NW7NEglNge9NjT3FeHdeTeyir0YPy1IWmWr8EAT2GRr/Wy7cDZH0CP5e/f6qo5Vcho+imtwHEblyYbUSD2HM1OOXrZSylNwHj2+5zhYEv4u3MF0pqH6y4aIe20KhgkNeT6xFObyVi/CLrFRU+XEK6T+K2dhWJPFVHnyGlOQtTOZHlWNeKOZbQeMXKbR/+PmmbQ260BdZ0BmyAdT4XjK3ATH9clt3FKVraOwcuasfYk7MW04q/2Xo7DSZzgHGHzvsPRLJTBoZtodc1geIvSMNovEPCLSezP4DgduQ+PVa2rGUKvuMimDkvjYUtcR+aXdS+cdiOtZOZjbGB1s6UWL3kMCEw75OosR6KIx32IudbJ0Q5ZRhG8jMRkHnJ5BE3mHrE/Fw/pjp+CYK5w2mFj8sd8pOkYkNsZAFs6bMJcq1l0J6A8T1OR2yARq2Aecnw0hCUJSsmH8U2h3GUy2r7NdZ6bCsxf7OtK0OspxkxEProvDuIHaxTidshIZtoJvcr7QJmijrFxTeHUQ9Ohyp/DYNU4vlkw6bwMkKaEKLSUZ1QPSQwwm2HTSMtsyvOcZDotjvkYzqqDwUlfElEnoonT8hEdVygGQuDFo/pE4agUaanSGpCyOfS3KZg0ah68413a+skDloHMbPk9TqQNZTcieNwMRRklkdSOSd3En0LGUSO0hmdWDheSZzEjVFt7RSykqSWR1osd0yR1ETlZIhie6QTyd2yhxFTpXfIInugfIalTqLkOIChOS5B7K/InMWFTE/NJLmDT9S7TF8eUzmNBLq8SMkzTvE6U/qNGRifzUotk4kyzusJ8oSbJ2HZc7DojgulPTkdpJUO7Al2IxkSrIgYRBN5xJJqR9iW4D54s89lRfiyFBXSckgdp1gKBcNgojVF9gvXZh0Z0XNygL7Sbz9B1ZOWUZhg4Ghs92YM59kAuolEpgQndL3cpoP4i4Wk7AHgX078ooWW1KT2yhEuDBfxzeKGxf7SUrEuSFKNSMWu9DewkIQ10Pihxkk9dxUmSETPEvxFsEsPt8M5We2WoEnu7iQ5etQegeRmLhS7RLH02KaHxOHInGUJtMmmmiiCa9QlH+Vc04+XvxQtAAAAABJRU5ErkJggg==" />
            )
            :
            (
              <div>
                <div className="handle" id="floatingDivHeader" >Drag from here</div>
                <div className="floatingDivContent" ></div>
                <div className="row" style={{ padding: '2px' }} >
                  <div className="text-center " style={{ padding: '0px', width: '100%' }} > <input type="text" name="chatInput" /><button>Send</button> <div onClick={this.props.minimize} >X</div></div>
                </div>
              </div>
            )
          }
        </div>
      </Draggable>
    );
  }
}

export default FloatingVideoDiv;