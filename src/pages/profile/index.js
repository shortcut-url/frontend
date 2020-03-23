import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { MainLayout } from 'components/layouts';
import { ProfileAvatar } from 'components/profile/avatar';
import { CreatedURLsTable, CreatedURLWithLinkCard } from 'components/url';
import {
  $createdURLsCurrentUser,
  downloadCreatedURLsCurrentUser,
  addCreatedURLsCurrentUser
} from 'models/page/profile';
import styles from './index.module.css';
import { userAPI } from 'api/user';

export default ({ listCreatedURLsCurrentUser }) => {
  let currentUser = useStore($session).user;

  addCreatedURLsCurrentUser(listCreatedURLsCurrentUser);

  useEffect(() => {
    if (!currentUser) Router.push('/login');
  });

  return (
    <>
      <Head>
        <title>Your profile</title>
      </Head>
      <MainLayout>
        <MainHeader />
        <CreatedURLs />
      </MainLayout>
    </>
  );
};

export let getServerSideProps = async () => {
  let getCreatedURLsCurrentUserResponse = await userAPI.getCreatedURLs({
    startIndex: 0,
    stopIndex: 20
  });

  return {
    props: {
      listCreatedURLsCurrentUser: getCreatedURLsCurrentUserResponse.data
    }
  };
};

export let MainHeader = () => {
  let currentUser = useStore($session).user;

  return (
    <header className={`${styles.container} ${styles.main_header}`}>
      <ProfileAvatar user={currentUser} />
      <h1 className={styles['main_header_current-user-name']}>
        {currentUser.username}
      </h1>
    </header>
  );
};

export let CreatedURLs = () => {
  let createdURLsCurrentUser = useStore($createdURLsCurrentUser);

  return (
    <section className={`${styles.container} created-urls_section`}>
      <h2 className={styles['created-urls_heading']}>Created URLs</h2>

      {createdURLsCurrentUser.length ? (
        <CreatedURLsTable
          urlList={createdURLsCurrentUser}
          createdURLCard={CreatedURLWithLinkCard}
          loadMoreCreatedURLs={downloadCreatedURLsCurrentUser}
        />
      ) : (
        <div className={styles['created-urls_empty']}>
          You don't have created urls
        </div>
      )}
    </section>
  );
};
