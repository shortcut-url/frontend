import React from 'react';

import styles from './created-url.module.css';
import { addNotification } from 'models/notification';

export let CreatedURLCopyClipboard = ({
  id,
  addNotificationWhenCopying = true,
  originalURL
}) => {
  let urlWithServerDomain = `${process.env.API_SERVER}/${id}`;

  let copyUrlClipboard = () => {
    navigator.clipboard.writeText(urlWithServerDomain).then(() => {
      if (!addNotificationWhenCopying) return;

      addNotification({
        content: 'You have successfully copied the link to the clipboard'
      });
    });
  };

  return (
    <article>
      <button
        onClick={copyUrlClipboard}
        className={`
            ${styles['created-url-card']}
            ${styles['created-url-card_button']}
            flat
            concave_hover
            pressed_active
          `}
        title="Copy url to clipboard"
        type="button"
      >
        <h3 className={`${styles['created-url-card_heading']}`}>
          {urlWithServerDomain}
        </h3>

        <div
          className={styles['created-url-card_original-url']}
          title={originalURL}
        >
          Original url: {originalURL}
        </div>
      </button>
    </article>
  );
};
