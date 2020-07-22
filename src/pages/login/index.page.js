import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';
import { AuthTypes } from './_auth-types';

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
        <AuthTypes />
      </MainLayout>
    </>
  );
};
