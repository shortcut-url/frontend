import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';
import { changeAllSettingsFutureURLs } from './store';
import { userAPI } from 'api/user';
import { SettingsFutureURLs } from './_settings';

export default ({ settingsFutureURLsCurrentUser }) => {
  changeAllSettingsFutureURLs(settingsFutureURLsCurrentUser);

  useEffect(() => {
    let user = $session.getState().user;

    if (!user) Router.push('/login');
  });

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

export let getServerSideProps = async (ctx) => {
  let settingsFutureURLsResponse = await userAPI.getSettingsFutureURLs({
    options: {
      headers: {
        cookie: ctx.req ? ctx.req.headers.cookie : null
      }
    }
  });

  return {
    props: {
      settingsFutureURLsCurrentUser: settingsFutureURLsResponse.data
    }
  };
};
