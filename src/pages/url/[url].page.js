import React from 'react';
import Head from 'next/head';

import { MainLayout } from 'components/layout';
import { urlAPI } from 'api/url';

import { addCreatedURLData } from './store';
import s from './index.module.css';
import { MainDataCreatedURL } from './_main-data';
import { StatisticsCreatedURL } from './_statistics';
import { ManagementCreatedURL } from './_management';

const UrlPage = ({ createdURL }) => {
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

export const getServerSideProps = async ({ params, req, res }) => {
  let createdURLDataResponse = await urlAPI.getCreatedURLData({
    url: params.url,
    options: {
      headers: {
        cookie: req.headers.cookie
      }
    }
  });

  if (!createdURLDataResponse.ok) {
    let queryParams = new URLSearchParams();
    queryParams.set('callbackLinkHref', '/profile');
    queryParams.set('callbackLinkText', 'Go to profile page');

    res.setHeader('location', `/404?${queryParams}`);
    res.statusCode = 301;
    res.end();

    return { props: {} };
  }

  return { props: { createdURL: createdURLDataResponse.data } };
};

export default UrlPage;
