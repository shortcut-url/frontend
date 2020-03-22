import React from 'react';
import { useList } from 'effector-react';

import { $notifications } from 'models/notifications';
import { InfoNotificationItem } from './item';
import styles from './index.module.css';

export let NotificationList = () => {
  let notifications = useList($notifications, InfoNotificationItem);

  if (!notifications.length) return null;

  return <div className={styles.notification_list}>{notifications}</div>;
};
