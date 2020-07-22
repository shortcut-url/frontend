import React from 'react';
import Head from 'next/head';

import { MainLayout } from 'components/layout';
import { JoinForm } from './_form';

export default () => {
  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>

      <MainLayout>
        <JoinForm />
      </MainLayout>
    </>
  );
};
