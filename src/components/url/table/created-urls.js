import React, { useEffect, useState, createRef } from 'react';

import styles from './created-urls.module.css';

export let CreatedURLsTable = ({
  urlList,
  createdURLCard: CreatedURLCard,
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
    <div ref={CreatedURLsListElement} className={styles.root} role="feed">
      {urlList.map((link) => (
        <CreatedURLCard key={link.url} {...link} />
      ))}
    </div>
  );
};
