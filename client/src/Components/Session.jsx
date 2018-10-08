import React from 'react';

const Session = (props) => {
  return(
    <div id="session" className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
      <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9" >
      <a> {props.info.roomId} </a>
      </div>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
      <a>
        {props.info.lastModifiedDate}
      </a>
      </div>
    </div>
  )
}

export default Session;