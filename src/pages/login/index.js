import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { $session } from 'models/session';
import { MainLayout } from 'components/layouts';
import { ButtonRaised } from 'components/button';
import styles from './index.module.css';

export default () => {
  useEffect(() => {
    let user = $session.getState();

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
        <ButtonRaised
          tag="a"
          className={`${styles.button} ${styles['button_google']}`}
          href={`${process.env.apiServer}/auth/google`}
        >
          Log in with Google
        </ButtonRaised>
      </li>
      <li>
        <ButtonRaised
          tag="a"
          className={`${styles.button} ${styles['button_twitter']}`}
          href={`${process.env.apiServer}/auth/twitter`}
        >
          Log in with Twitter
        </ButtonRaised>
      </li>
      <li>
        <ButtonRaised
          tag="a"
          className={`${styles.button} ${styles['button_email']}`}
          href="/login/email"
        >
          Log in with Email
        </ButtonRaised>
      </li>
      <li>
        <hr className={styles.hr} />
        <Link href="/register">
          <a className={styles['button_create-account']}>
            Or, register using mail
          </a>
        </Link>
      </li>
    </ul>
  );
};
