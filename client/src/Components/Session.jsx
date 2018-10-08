import React from 'react';

const Session = (props) => {
  return (
    <table id="session" className="table col-xs-12 col-sm-12 col-md-12 col-lg-12" >
      <thead  >
        <tr>
          <th align="left" className="text-center" >Title</th>
          <th className="text-center" ></th>
          <th align="right" className="text-center" >Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="left" className="text-center " >{props.info.roomId}</td>
          <td className="text-center " ></td>
          <td align="right" className="text-center " >{props.info.lastModifiedDate}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Session;