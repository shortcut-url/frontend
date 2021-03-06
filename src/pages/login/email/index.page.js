import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import { MainLayout } from 'components/layout';
import { $session } from 'models/session';

import { LoginEmailForm } from './_form';

const LoginWithEmailPage = () => {
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

export default LoginWithEmailPage;
