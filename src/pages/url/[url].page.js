import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { MainLayout } from 'components/layout';
import { urlAPI } from 'api/url';
import { useStore } from 'effector-react';
import {
  $createdURL,
  addCreatedURLData,
  changeParameterCreatedURL,
  deleteCreatedURL
} from 'models/page/url/management-created-url';
import styles from './url.module.css';
import { Checkbox } from 'components/form';
import { Button, ButtonStyles } from 'components/button';
import { copyUrlClipboard } from 'components/url';
import { addNotification } from 'models/notification';

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

      <MainLayout mainClassName={styles['created-url_container']}>
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

export let MainDataCreatedURL = () => {
  let createdURL = useStore($createdURL);

  let urlWithServerDomain = `${process.env.API_SERVER}/${createdURL.url}`;

  function copyOriginalUrlToClipboard() {
    navigator.clipboard.writeText(createdURL.originalURL).then(() => {
      addNotification({
        content: 'You copied the original url to the clipboard'
      });
    });
  }

  return (
    <section
      className={`
        flat
        ${styles['created-url_card']}
      `}
    >
      <button
        onClick={() => copyUrlClipboard({ url: urlWithServerDomain })}
        className={styles['main-data-created-url_button-heading']}
        title="Click to copy url to clipboard"
        type="button"
      >
        <h1>{urlWithServerDomain}</h1>
      </button>

      <button
        onClick={copyOriginalUrlToClipboard}
        className={`
          ${ButtonStyles.reset_button} 
          ${styles['main-data-created-url_button-original-url']}
        `}
        title={
          'Click to copy the original URL to the clipboard.' +
          '\n\n' +
          createdURL.originalURL
        }
        type="button"
      >
        Original URL: {createdURL.originalURL}
      </button>
    </section>
  );
};

export let StatisticsCreatedURL = () => {
  let { statistics } = useStore($createdURL);

  return (
    <section className={`flat ${styles['created-url_card']}`}>
      <h2>Statistics</h2>

      <ul className={styles['statistics-created-url_list']}>
        <li>
          Number of transitions on the URL: {statistics.numberTransitions}
        </li>
      </ul>
    </section>
  );
};

export let ManagementCreatedURL = () => {
  let { settings } = useStore($createdURL);

  return (
    <section className={`flat ${styles['created-url_card']}`}>
      <h2>Management</h2>

      <ul className={styles['management-created-url_list']}>
        <li>
          <Checkbox
            checked={settings.trackingNumberTransitions}
            onChange={(event) =>
              changeParameterCreatedURL({
                name: 'trackingNumberTransitions',
                value: event.target.checked
              })
            }
          >
            Tracking the number of transitions on URL
          </Checkbox>
        </li>

        <li className={styles['management-created-url_group-buttons']}>
          <Button
            onClick={() => {
              changeParameterCreatedURL({
                name: 'disabled',
                value: !settings.disabled
              });
            }}
            type="button"
          >
            {settings.disabled ? 'Enable URL' : 'Disable URL'}
          </Button>

          <Button onClick={deleteCreatedURL} variant="danger" type="button">
            Remove URL
          </Button>
        </li>
      </ul>
    </section>
  );
};
