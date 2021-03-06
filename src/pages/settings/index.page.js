import React, { useEffect } from 'react';
import Head from 'next/head';
import { useStore } from 'effector-react';
import Router from 'next/router';
import Link from 'next/link';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';
import { Button } from 'components/button';

import s from './index.module.css';
import { destroySession } from './store';

const SettingsPage = () => {
  let userSession = useStore($session).user;

  useEffect(() => {
    if (userSession) return;

    Router.push('/login');
  }, [userSession]);

  if (!userSession) return null;

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

const Settings = () => {
  return (
    <ul className={s['settings-list']}>
      <li>
        <Button
          onClick={destroySession}
          className={s['settings-list_button']}
          type="button"
        >
          Sign out
        </Button>
      </li>

      <li>
        <Link href="/settings/delete-account" passHref>
          <Button
            className={s['settings-list_button']}
            variant="danger"
            tag="a"
          >
            Delete account
          </Button>
        </Link>
      </li>
    </ul>
  );
};

export default SettingsPage;
