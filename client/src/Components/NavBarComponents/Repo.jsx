import React from 'react';

const Repo = (props) => {
  return (
    <div className='repo-container'>
      <div className='repo-name'>
        {/* <a href={props.repo.url}></a> */}
        {props.repo.name}
      </div>
      <div className='repo-description'>{props.repo.description}</div>
    </div>
  );
};

export default Repo;
