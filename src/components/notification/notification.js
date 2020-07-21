import React, { createRef, useEffect } from 'react';
import { removeNotification } from 'models/notification';

import s from './notification.module.css';
import { ButtonStyles } from 'components/button';
import { classNames } from 'lib/utils/class-names';

export let NotificationItem = ({ id, content, duration = 4000 }) => {
  let notificationElement = createRef();

  let removeNotificationHandler = () => removeNotification(id);

  useEffect(() => {
    notificationElement.current.focus();

    setTimeout(removeNotificationHandler, duration);
  });

  let rootClassName = classNames(s.root, 'flat');

  return (
    <div ref={notificationElement} className={rootClassName} tabIndex="0">
      <div className={s.content}>{content}</div>

      <button
        onClick={removeNotificationHandler}
        className={`
          ${ButtonStyles.reset_button}
          ${s.button} 
          pressed_active
        `}
        aria-label="Delete Notification"
      >
        ×
      </button>
    </div>
  );
};
