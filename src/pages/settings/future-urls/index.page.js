import React from 'react';
import Head from 'next/head';

import { MainLayout } from 'components/layout';
import { userAPI } from 'api/user';

import { changeAllSettingsFutureURLs } from './store';
import { SettingsFutureURLs } from './_settings';

const SettingsFutureUrlsPage = ({ settingsFutureURLsCurrentUser }) => {
  changeAllSettingsFutureURLs(settingsFutureURLsCurrentUser);

  return (
    <>
      <Head>
        <title>Settings for future URLs</title>
      </Head>

      <MainLayout>
        <SettingsFutureURLs />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  let settingsFutureURLsResponse = await userAPI.getSettingsFutureURLs({
    options: {
      headers: {
        cookie: req ? req.headers.cookie : null
      }
    }
  });

  if (!settingsFutureURLsResponse.ok) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();

    return { props: {} };
  }

  return {
    props: {
      settingsFutureURLsCurrentUser: settingsFutureURLsResponse.data
    }
  };
};

export default SettingsFutureUrlsPage;
