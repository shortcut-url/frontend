import React from 'react';
import { useList } from 'effector-react';

import { $notifications } from 'models/notification';
import { NotificationItem } from './notification';
import styles from './list.module.css';

export let NotificationList = () => {
  let notifications = useList($notifications, NotificationItem);

  if (!notifications.length) return null;

  return <div className={styles.root}>{notifications}</div>;
};
