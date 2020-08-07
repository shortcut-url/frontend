import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';

import { AuthTypes } from './_auth-types';

const LoginPage = () => {
  let userSession = useStore($session).user;

  useEffect(() => {
    if (!userSession) return;

    Router.push('/');
  }, [userSession]);

  if (userSession) return null;

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <MainLayout>
        <AuthTypes />
      </MainLayout>
    </>
  );
};

export default LoginPage;
