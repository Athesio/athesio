import React from 'react';

class Midway extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {

    return (
      <div id="Midway" >
        <div className="container-fluid" id="MidwayBox" >
        <div className="row" id="formBox" >
          <div className="col-md-3"   ></div>
          <div className="col-md-6"  >
          <form role="form" >
            <div className="form-group" >
              <label htmlFor="NewEditor">Open New Editor</label><br />
              <button className="btn" onClick={this.props.changeScreens} type="button" >New Editor</button>
            </div>
            <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px'  }} >
              <a className="text-center" >Join a Room </a><br />
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Room Key"></input>

                <span className="input-group-btn">
                  <button className="btn" type="button" onClick={this.props.changeScreens}>JOIN</button>
                </span>
              </div>
            </div>
          </form>
          </div>
          <div className="col-md-3" ></div>
        </div>
        </div>
      </div>
    )
  }
}

export default Midway;