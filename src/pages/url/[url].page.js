import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { MainLayout } from 'components/layout';
import { urlAPI } from 'api/url';
import { addCreatedURLData } from './store';
import s from './index.module.css';
import { MainDataCreatedURL } from './_main-data';
import { StatisticsCreatedURL } from './_statistics';
import { ManagementCreatedURL } from './_management';

export default ({ createdURL }) => {
  useEffect(() => {
    if (!createdURL) Router.push('/404');
  });

  addCreatedURLData(createdURL);

  return (
    <>
      <Head>
        <title>Management created by URL</title>
      </Head>

      <MainLayout mainClassName={s.layout_main}>
        <MainDataCreatedURL />

        <StatisticsCreatedURL />

        <ManagementCreatedURL />
      </MainLayout>
    </>
  );
};

export let getServerSideProps = async ({ params, req }) => {
  let createdURLDataResponse = await urlAPI.getCreatedURLData({
    url: params.url,
    options: {
      headers: {
        cookie: req.headers.cookie
      }
    }
  });

  if (!createdURLDataResponse.ok) return { props: {} };

  return { props: { createdURL: createdURLDataResponse.data } };
};
