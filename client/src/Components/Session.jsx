import React from 'react';

const Session = (props) => {
  return (
    <tr onClick={() => props.handleClick(props.info)}>
      <td align="left" className="text-center " >{props.info.roomId}</td>
      <td className="text-center " ></td>
      <td align="right" className="text-center " >{props.info.lastModifiedDate}</td>
    </tr>
  )
}

export default Session;