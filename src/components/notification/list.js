import React from 'react';
import { useStore } from 'effector-react';

import { $notifications } from 'models/notification';

import { FlyingNotificationItem } from './flying-notification';

export const NotificationList = () => {
  let notifications = useStore($notifications);

  if (!notifications.length) return null;

  return (
    <>
      {notifications.map((notification) => {
        return (
          <FlyingNotificationItem key={notification.id} {...notification} />
        );
      })}
    </>
  );
};
