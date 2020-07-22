import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { MainLayout } from 'components/layout';
import { $session } from 'models/session';
import { DeleteAccountCard } from './_card';

export default () => {
  useEffect(() => {
    let user = $session.getState().user;

    if (!user) Router.push('/login');
  });

  return (
    <>
      <Head>
        <title>Delete account</title>
      </Head>

      <MainLayout>
        <DeleteAccountCard />
      </MainLayout>
    </>
  );
};
