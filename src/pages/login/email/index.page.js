import React from 'react';
import Head from 'next/head';

import { MainLayout } from 'components/layout';
import { LoginEmailForm } from './_form';

export default () => {
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
