import React from 'react';
import { useList } from 'effector-react';
import { $listCreatedURLs } from 'models/page/home';
import { copyUrlClipboard } from 'components/url';
import { CreatedUrlCard } from 'components/url';

import s from './list-created-urls.module.css';

let ListCreatedURLs = () => {
  let listCreatedURLs = useList($listCreatedURLs, CreatedURLCopyClipboard);

  if (!listCreatedURLs.length) return null;

  return (
    <div role="feed" className={s.root}>
      {listCreatedURLs}
    </div>
  );
};

let CreatedURLCopyClipboard = ({ id, originalURL }) => {
  function handleClick() {
    copyUrlClipboard({
      url: id,
      addNotificationWhenCopying: true
    });
  }

  return (
    <article>
      <CreatedUrlCard
        url={id}
        originalURL={originalURL}
        onClick={handleClick}
        title="Copy url to clipboard"
        type="button"
      />
    </article>
  );
};

export { ListCreatedURLs };
