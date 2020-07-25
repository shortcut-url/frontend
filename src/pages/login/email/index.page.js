import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { MainLayout } from 'components/layout';
import { LoginEmailForm } from './_form';
import { useStore } from 'effector-react';
import { $session } from 'models/session';

export default () => {
  let userSession = useStore($session).user;

  useEffect(() => {
    if (!userSession) return;

    Router.push('/login');
  }, [userSession]);

  if (userSession) return null;

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <MainLayout>
        <LoginEmailForm />
      </MainLayout>
    </>
  );
};
