import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { $session } from 'models/session';
import styles from './index.module.css';
import { MainLayout } from 'components/layouts';
import { Checkbox } from 'components/form';
import { useStore } from 'effector-react';
import {
  $settingsFutureLinks,
  changeSettingsFutureLink
} from 'models/page/settings/future-links';
import { userAPI } from 'api/user';
import { addNotification } from 'models/notifications';

export default () => {
  useEffect(() => {
    let user = $session.getState().user;

    if (!user) Router.push('/login');
  });

  return (
    <>
      <Head>
        <title>Settings for future links</title>
      </Head>
      <MainLayout>
        <Settings />
      </MainLayout>
    </>
  );
};

let Settings = () => {
  let settingsFutureLinks = useStore($settingsFutureLinks);

  return (
    <ul className={styles['settings']} aria-label="Settings list">
      <li>
        <Checkbox
          checked={settingsFutureLinks.statistics}
          onChange={event =>
            changeSetting({
              name: 'statistics',
              value: event.target.checked
            })
          }
        >
          Keep statistics on future links
        </Checkbox>
      </li>
    </ul>
  );
};

let changeSetting = async ({ name, value }) => {
  changeSettingsFutureLink({ name, value });

  let changeSettingsResponse = await userAPI.changeSettingsFutureLinks({
    name,
    value
  });

  if (changeSettingsResponse.ok) return;

  changeSettingsFutureLink({ name, value: !value });

  addNotification({ content: changeSettingsResponse.data });
};
