import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { $session } from 'models/session';
import styles from './index.module.css';
import { MainLayout } from 'components/layout';
import { Button } from 'components/button';
import { destroySession } from './store';

export default () => {
  useEffect(() => {
    let user = $session.getState().user;

    if (!user) Router.push('/login');
  });

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <MainLayout>
        <Settings />
      </MainLayout>
    </>
  );
};

let Settings = () => {
  return (
    <ul className={styles['settings-list']}>
      <li>
        <Button
          onClick={destroySession}
          className={styles['settings-list_button']}
        >
          Sign out
        </Button>
      </li>

      <li>
        <Button
          className={styles['settings-list_button']}
          variant="danger"
          tag="a"
          href="/settings/delete-account"
        >
          Delete account
        </Button>
      </li>
    </ul>
  );
};
