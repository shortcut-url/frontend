import React from 'react';

import styles from './created-url.module.css';

export const CreatedURLCard = ({ id, originalUrl }) => {
  let urlWithServerDomain = `${process.env.API_SERVER}/${id}`;

  let copyUrlClipboard = () =>
    navigator.clipboard.writeText(urlWithServerDomain);

  return (
    <article key={id}>
      <button
        onClick={copyUrlClipboard}
        className={`
            ${styles['created-url-card']}
            flat
            concave_hover
            pressed_active
          `}
        title="Copy url to clipboard"
        type="button"
      >
        <h4>{urlWithServerDomain}</h4>
        <div
          className={styles['created-url-card_original-url']}
          title={originalUrl}
        >
          Original url: {originalUrl}
        </div>
      </button>
    </article>
  );
};
