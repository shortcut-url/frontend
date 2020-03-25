import React from 'react';

import styles from './created-url.module.css';
import { Button } from 'components/button';
import { copyUrlClipboard } from '../utils';

export let CreatedURLCopyClipboard = ({
  id,
  addNotificationWhenCopying = true,
  originalURL
}) => {
  let urlWithServerDomain = `${process.env.API_SERVER}/${id}`;

  return (
    <article>
      <Button
        onClick={() =>
          copyUrlClipboard({
            url: urlWithServerDomain,
            addNotificationWhenCopying
          })
        }
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
