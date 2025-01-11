import React from 'react'
import store from '../../../lib/features/redux/store';
import { minusStudyCreated } from '../../../lib/features/redux/notificationSlice';

const StudyCreatedEvent = ({path}) => {
  console.log("path", path);
  const handleClick = () => {
    store.dispatch(minusStudyCreated(path));
  };
  return (
    <div onClick={handleClick}>
      [Study Created] {path}
    </div>
  );
}

export default StudyCreatedEvent