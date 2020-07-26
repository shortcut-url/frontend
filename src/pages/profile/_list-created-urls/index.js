import React from 'react';
import { useStore } from 'effector-react';
import Link from 'next/link';

import mainStyle from '../index.module.css';
import s from './index.module.css';
import {
  $createdURLsCurrentUser,
  downloadCreatedURLsCurrentUser
} from '../store';
import { CreatedUrlCard, CreatedURLsTable } from 'components/url';
import { classNames } from 'lib/utils/class-names';

export const ListCreatedURLs = () => {
  let listCreatedURLs = useStore($createdURLsCurrentUser);

  let rootClassName = classNames(mainStyle.container, s.root);

  return (
    <section className={rootClassName}>
      <h2 className={s.heading}>Created URLs</h2>

      {listCreatedURLs.length ? (
        <CreatedURLsTable
          urlList={listCreatedURLs}
          card={CreatedUrl}
          loadMoreCreatedURLs={downloadCreatedURLsCurrentUser}
        />
      ) : (
        <div className={s['list-empty']}>You don't have created urls</div>
      )}
    </section>
  );
};

const CreatedUrl = ({ url, originalURL }) => {
  return (
    <article>
      <Link href={`url/${url}`} prefetch={false} passHref>
        <CreatedUrlCard tag="a" url={url} originalURL={originalURL} />
      </Link>
    </article>
  );
};
