import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { $session } from 'models/session';
import styles from './index.module.css';
import { MainLayout } from 'components/layouts';
import { Checkbox } from 'components/form';
import { useStore } from 'effector-react';
import {
  $settingsFutureURLs,
  changeParameterFutureURLs,
  changeAllSettingsFutureURLs
} from 'models/page/settings/future-urls';
import { userAPI } from 'api/user';
import { addNotification } from 'models/notifications';

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

export let getServerSideProps = async () => {
  let settingsFutureURLsResponse = await userAPI.getSettingsFutureURLs({
    startIndex: 0,
    stopIndex: 20
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
    <ul className={styles['settings_list']} aria-label="Settings list">
      <li>
        <Checkbox
          checked={settingsFutureURLs.statistics}
          onChange={event =>
            changeSetting({
              name: 'statistics',
              value: event.target.checked
            })
          }
        >
          Include statistics (Count of transitions, etc.) for future URLs
        </Checkbox>
      </li>
    </ul>
  );
};

let changeSetting = async ({ name, value }) => {
  changeParameterFutureURLs({ name, value });

  let changeParameterResponse = await userAPI.changeParameterFutureURLs({
    name,
    value
  });

  if (changeParameterResponse.ok) return;

  changeParameterFutureURLs({ name, value: !value });

  addNotification({ content: changeParameterResponse.data });
};
