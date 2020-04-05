import { createEvent, createStore } from 'effector';

export const addNotification = createEvent();
export const removeNotification = createEvent();

export const $notifications = createStore([]);

$notifications.on(addNotification, (notifications, newNotification) => {
  let notification = { id: new Date().getTime(), ...newNotification };

  return [...notifications, notification];
});

$notifications.on(
  removeNotification,
  (notifications, IdnotificationToDelete) => {
    return notifications.filter((n) => n.id !== IdnotificationToDelete);
  }
);
