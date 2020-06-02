import React, { createRef, useEffect } from 'react';
import { removeNotification } from 'models/notification';

import styles from './notification.module.css';
import { ButtonStyles } from 'components/button';

export let NotificationItem = ({ id, content, duration = 4000 }) => {
  let notificationElement = createRef();

  let removeNotificationHandler = () => removeNotification(id);

  useEffect(() => {
    notificationElement.current.focus();

    setTimeout(removeNotificationHandler, duration);
  });

  return (
    <div
      ref={notificationElement}
      className={`${styles.root} flat`}
      tabIndex="0"
    >
      <div className={styles.content}>{content}</div>

      <button
        onClick={removeNotificationHandler}
        className={`
          ${ButtonStyles.reset_button}
          ${styles.button} 
          pressed_active
        `}
        aria-label="Delete Notification"
      >
        ×
      </button>
    </div>
  );
};
