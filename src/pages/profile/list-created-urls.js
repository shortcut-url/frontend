import React from 'react';
import { useStore } from 'effector-react';
import Link from 'next/link';

import {
  $createdURLsCurrentUser,
  downloadCreatedURLsCurrentUser
} from 'models/page/profile';
import { CreatedUrlCard, CreatedURLsTable } from 'components/url';
import mainStyle from './index.module.css';
import s from './list-created-urls.module.css';
import { classNames } from 'lib/utils/class-names';

let ListCreatedURLs = () => {
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

let CreatedUrl = ({ url, originalURL }) => {
  return (
    <article>
      <Link href={`url/${url}`} prefetch={false} passHref>
        <CreatedUrlCard tag="a" url={url} originalURL={originalURL} />
      </Link>
    </article>
  );
};

export { ListCreatedURLs };
