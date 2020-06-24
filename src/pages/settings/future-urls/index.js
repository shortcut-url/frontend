import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { $session } from 'models/session';
import styles from './index.module.css';
import { MainLayout } from 'components/layout';
import { Checkbox } from 'components/form';
import { useStore } from 'effector-react';
import {
  $settingsFutureURLs,
  changeParameterFutureURLs,
  changeAllSettingsFutureURLs
} from 'models/page/settings/future-urls';
import { userAPI } from 'api/user';

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
        <Settings />
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

let Settings = () => {
  let settingsFutureURLs = useStore($settingsFutureURLs);

  return (
    <ul className={styles['settings_list']}>
      <li>
        <Checkbox
          checked={settingsFutureURLs.trackingNumberTransitions}
          onChange={(event) =>
            changeParameterFutureURLs({
              name: 'trackingNumberTransitions',
              value: event.target.checked
            })
          }
        >
          Tracking the number of transitions on URLs
        </Checkbox>
      </li>
    </ul>
  );
};
