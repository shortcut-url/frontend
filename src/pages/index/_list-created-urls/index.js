import React from 'react';
import { useList } from 'effector-react';

import { CreatedUrlCard } from 'components/url';

import s from './index.module.css';
import { $listCreatedURLs } from '../store';

export const ListCreatedURLs = () => {
  let listCreatedURLs = useList($listCreatedURLs, CreatedURLCopyClipboard);

  if (!listCreatedURLs.length) return null;

  return (
    <div role="feed" className={s.root}>
      {listCreatedURLs}
    </div>
  );
};

const CreatedURLCopyClipboard = ({ id, originalURL }) => {
  return (
    <article>
      <CreatedUrlCard
        url={id}
        originalURL={originalURL}
        WithCopyShortUrlToClipboard={true}
        title="Copy url to clipboard"
        type="button"
      />
    </article>
  );
};
