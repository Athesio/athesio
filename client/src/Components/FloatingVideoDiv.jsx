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
        {/* {this.props.ministatus === true ?
          ( */}
            <div id="floatingDiv" style={{ backgroundColor: 'white' }} >
              <div className="handle" id="floatingDivHeader" >Drag from here</div>
              <div className="floatingDivContent" ></div>
              <div className="row" style={{ padding: '2px' }} >
                <div className="text-center " style={{ padding: '0px', width: '100%' }} > <input type="text" name="chatInput" /><button>Send</button> <div onClick={this.props.minimize} >-</div></div>

              </div>
            </div>
          {/* ) :
          (
            <div onClick={this.props.minimize}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAP1SURBVGhD7VpdiIxRGP78/845u4uk5L9cyAWSSz9ZkdyIC6KkSMrFKmWlKJS4kqVc+EloQxIlUSZzZhbtkuSCZNvFrmjtfN8uIex43m9f+83OvsPMmJk9F/PU0zft9/4855z3/M2sU0IJJRQeXbecYXGjF7lGVXtGXfGi6rEb1R/BH15UJ7qpPoPNYBg85Rm92YuGZnKI/kMi4Qz0YqGVEFQL8R2B4OzoGv0CMQ7F7+upHLo4SDx3hroRtR292igJy5Vo0C+M4E00aC6nKhw8E1qB3nslCckX0aAuPC92Phg1ntPmDx/C40aj/s+mJi0k0aC2eEyvYQn/DzeqpqMRz6RkhSaNDvIfTVx2BrGc3NBpymehbt9LSYrMS4mwM5hlZQe3Ts2gJVQI2j80+gJWygEsLzNgSMsLPalzotEHWWJmgEOtGKifSXMmHtWLWebfAeO1UhB7qJpbGiaMZLky6KgBw9dyAHuIVXQvS5aBYdsiOdpHFae9jWX3BQyeyo72EfvLNpbdG511ZbMlB1uJhhiW3huou92Sg63EHvcTe10Fyw+AFl6THGwmOr+S5QdAC19KxukI+1bcQzzpXTKR7B3mXqf0rjfVG8T7Ir9LyyqWHwBBXMFQJEZvD/l01U0cAaHXJRsirYJk1/awQiH+PcnG3+SMXk12HeHRY9Ggx5KdROQ+Qn69IBmKRK/R7ZDdHDem5qexa2ITH/5dRrZ7wiY+vEhoo2gn0eiT7BYApfJNNE4hTbLkSw/1pmQHgR3Jaz16fqtkh15toVsnm9GiUy3ZpeFxdgsAgRkf12H70O9h9B4JkWy6qe6iDJf5G63Rn2QbiqeuIU4lnjsym089PMDyA/jiZGObuYnlB8AfT6QYWU+U6zyWHwBDu14ytpYoVfEKTEskyuur6GQhofU8S+8LGFxOdbCVHZGyhSy7L6jmJCfrmLL3iMASeEN0tojo8KUsNz3aTfmkLNfy4tKoqyz137D1pogJ3uo9Co1hmZmBzjFSsH4jnYwjoQUsL3PQGk3DKAYtMjEnvnumbBVLyx7UGEz+c1LwYtHf22KhlSwpd9DXlAi40+8VIVFhqRrjMT2HpeQHdIqVkxWGODKdQeeVc/r8wY2o5VLCvNPoeozCEk6bf6B3jomJ80DEpl+p7tCEzvob92yQCDvD/TVcEJEraRKjfCL4vAsNmcapCouMNkijb8cf6ClUFt0/lurD4Ak6pWJ+ncbnGjz3edHQBrrnJxqcIRy+OKB7N/aTtz2CU8hlUZN877YSGP4jqeJ7aFQT3bXZ1F5QCaA0kv574U8DdD1GYqv1o/AHEF2FTekUnjUQvx+1v649VjaZX5dQQlo4zm8qYCSPs2JQPQAAAABJRU5ErkJggg=="></img>
            </div>
          )
        } */}

      </Draggable>
    );
  }
}

export default FloatingVideoDiv;