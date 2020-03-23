import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';
import { Button } from 'components/button';
import styles from './index.module.css';

export default () => {
  useEffect(() => {
    let user = $session.getState().user;

    if (user) Router.push('/');
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <MainLayout>
        <AuthorizationTypes />
      </MainLayout>
    </>
  );
};

export let AuthorizationTypes = () => {
  return (
    <ul className={styles['list-auth-types']}>
      <li>
        <Button
          tag="a"
          className={`${styles.button} ${styles['button_google']}`}
          href={`${process.env.API_SERVER}/auth/google`}
        >
          Log in with Google
        </Button>
      </li>
      <li>
        <Button
          tag="a"
          className={`${styles.button} ${styles['button_twitter']}`}
          href={`${process.env.API_SERVER}/auth/twitter`}
        >
          Log in with Twitter
        </Button>
      </li>
      <li>
        <Button
          tag="a"
          className={`${styles.button} ${styles['button_email']}`}
          href="/login/email"
        >
          Log in with Email
        </Button>
      </li>
      <li>
        <hr className={styles.hr} />
        <Link href="/join">
          <a className={styles['link_create-account']}>
            Or, register using mail
          </a>
        </Link>
      </li>
    </ul>
  );
};
