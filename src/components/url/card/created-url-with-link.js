import React from 'react';
import Link from 'next/link';

import styles from './created-url.module.css';
import { Button } from 'components/button';

export let CreatedURLWithLinkCard = ({ url, originalURL }) => {
  let urlWithServerDomain = `${process.env.API_SERVER}/${url}`;

  return (
    <article>
      <Link href={`link/${url}`}>
        <Button tag="a" className={styles['created-url-card']}>
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
      </Link>
    </article>
  );
};
