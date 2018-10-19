import React from 'react';

const Session = (props) => {
  return (
    <tr onClick={() => props.handleClick(props.info)}>
      <td align="left" className="text-center " >{props.info.roomId ? props.info.roomId : props.info.name}</td>
      <td className="text-center " ></td>
      <td align="right" className="text-center " >{props.info.lastModifiedDate ? props.info.lastModifiedDate : props.info.language}</td>
    </tr>
  )
}

export default Session;