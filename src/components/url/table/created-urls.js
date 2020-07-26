import React, { useEffect, useState, createRef } from 'react';

import s from './created-urls.module.css';

export const CreatedURLsTable = ({
  urlList,
  card: Card,
  loadMoreCreatedURLs
}) => {
  let CreatedURLsListElement = createRef();

  let [isLoadingCreatedURLs, setIsLoadingCreatedURLs] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', infiniteScrollCreatedURLs);

    return () => {
      removeInfiniteScrollCreatedURLs();
    };
  });

  function removeInfiniteScrollCreatedURLs() {
    document.removeEventListener('scroll', infiniteScrollCreatedURLs);
  }

  function infiniteScrollCreatedURLs() {
    if (isLoadingCreatedURLs) return;

    if (urlList.length < 20) removeInfiniteScrollCreatedURLs();

    let pageYoffset = window.pageYOffset + window.innerHeight;

    let containerOffset =
      CreatedURLsListElement.current.offsetTop +
      CreatedURLsListElement.current.clientHeight;

    if (pageYoffset + 300 >= containerOffset) {
      loadingNewCreatedURLs();
    }
  }

  async function loadingNewCreatedURLs() {
    setIsLoadingCreatedURLs(true);

    await loadMoreCreatedURLs({
      startIndex: urlList.length,
      stopIndex: urlList.length + 20
    });

    setIsLoadingCreatedURLs(false);
  }

  return (
    <div ref={CreatedURLsListElement} className={s.root} role="feed">
      {urlList.map((link) => (
        <Card key={link.url} {...link} />
      ))}
    </div>
  );
};
