import React from 'react'
import store from '../../../lib/features/redux/store';
import { minusStudyCreated } from '../../../lib/features/redux/notificationSlice';

const StudyCreatedEvent = ({id, path, notifications, setNotifications}) => {
  console.log("path", path, id);
  const handleClick = () => {
    store.dispatch(minusStudyCreated(id));
    setNotifications(notifications.filter((noti) => noti.id !== id));
  };
  return (
    <div onClick={handleClick}>
      [Study Created] {path}
    </div>
  );
}

export default StudyCreatedEvent