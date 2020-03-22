import React from 'react';
import Link from 'next/link';

import styles from './created-url.module.css';

export let CreatedURLWithLinkCard = ({ url, originalURL }) => {
  let urlWithServerDomain = `${process.env.API_SERVER}/${url}`;

  return (
    <article>
      <Link href={`link/${url}`}>
        <a
          className={`
            ${styles['created-url-card']}
            flat 
            concave_hover 
            pressed_active
          `}
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
        </a>
      </Link>
    </article>
  );
};
