import React from 'react';

import styles from './created-url.module.css';
import { addNotification } from 'models/notification';
import { Button } from 'components/button';

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
      <Button
        onClick={copyUrlClipboard}
        className={styles['created-url-card']}
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
      </Button>
    </article>
  );
};
