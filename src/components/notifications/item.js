import React, { createRef, useEffect } from 'react';
import { removeNotification } from 'models/notifications';

import styles from './index.module.css';

export const NotificationItem = ({ id, content, duration = 4000 }) => {
  let notificationElement = createRef();

  let removeNotificationHandler = () => removeNotification(id);

  useEffect(() => {
    notificationElement.current.focus();

    setTimeout(removeNotificationHandler, duration);
  });

  return (
    <div
      ref={notificationElement}
      className={`${styles.notification} flat`}
      tabIndex="0"
    >
      <div className={styles.notification_content}>{content}</div>
      <button
        onClick={removeNotificationHandler}
        className={`${styles.notification_button} pressed_active`}
        aria-label="Delete Notification"
      >
        ×
      </button>
    </div>
  );
};
