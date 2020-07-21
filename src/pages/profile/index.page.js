import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';
import { Avatar } from 'components/avatar';
import { addCreatedURLsCurrentUser } from 'models/page/profile';
import styles from './index.module.css';
import { userAPI } from 'api/user';
import { Button } from 'components/button';
import { ListCreatedURLs } from './list-created-urls';

export default ({ listCreatedURLsCurrentUser }) => {
  let currentUser = useStore($session).user;

  useEffect(() => {
    if (!currentUser) Router.push('/login');
  }, [currentUser]);

  useEffect(() => {
    addCreatedURLsCurrentUser(listCreatedURLsCurrentUser);
  }, [listCreatedURLsCurrentUser]);

  return (
    <>
      <Head>
        <title>Your profile</title>
      </Head>

      <MainLayout>
        <MainHeader />

        <ListCreatedURLs />
      </MainLayout>
    </>
  );
};

export let getServerSideProps = async (ctx) => {
  let getCreatedURLsCurrentUserResponse = await userAPI.getCreatedURLs({
    startIndex: 0,
    stopIndex: 20,
    options: {
      headers: {
        cookie: ctx.req ? ctx.req.headers.cookie : null
      }
    }
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
      <Avatar
        containerClass={styles['main_header_avatar-container']}
        withAvatarManagement={true}
      />

      <h1 className={styles['main_header_current-user-name']}>
        {currentUser.name}
      </h1>

      <Button tag="a" href="/settings">
        Settings
      </Button>
    </header>
  );
};
