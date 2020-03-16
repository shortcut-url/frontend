import React from 'react';
import { useStore } from 'effector-react';

import { $notifications } from 'models/notifications';
import { NotificationItem } from './item';
import styles from './index.module.css';

export let Notifications = () => {
  let notifications = useStore($notifications);

  if (!notifications.length) return null;

  return (
    <div className={styles.container}>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </div>
  );
};
