import React, { useEffect } from 'react';
import Head from 'next/head';

import { MainLayout } from 'components/layout';
import { clearListCreatedURLs } from './store';
import { ListCreatedURLs } from './_list-created-urls';
import { Form } from './_form';

export default () => {
  useEffect(() => {
    return () => {
      clearListCreatedURLs();
    };
  });

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <MainLayout>
        <Form />

        <ListCreatedURLs />
      </MainLayout>
    </>
  );
};
