import React, { useEffect } from 'react';
import Head from 'next/head';

import { MainLayout } from 'components/layout';

import { clearListCreatedURLs } from './index/store';
import { ListCreatedURLs } from './index/_list-created-urls';
import { Form } from './index/_form';

const HomePage = () => {
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

export default HomePage;
