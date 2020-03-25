import { addNotification } from 'models/notification';

export let copyUrlClipboard = ({ url, addNotificationWhenCopying = true }) => {
  navigator.clipboard.writeText(url).then(() => {
    if (!addNotificationWhenCopying) return;

    addNotification({
      content: 'You have successfully copied the link to the clipboard'
    });
  });
};
