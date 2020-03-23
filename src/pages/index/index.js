import React, { useEffect } from 'react';
import Head from 'next/head';
import { useStore, useList } from 'effector-react';

import Link from 'next/link';

import { MainLayout } from 'components/layouts';
import { StandardInput } from 'components/input';
import { Button } from 'components/button';
import {
  $urlField,
  urlFieldChange,
  $urlFieldError,
  $isSubmitEnabled,
  $listCreatedURLs,
  formSubmitted,
  $isFormLoading,
  clearListCreatedURLs
} from 'models/page/home';
import styles from './index.module.css';
import { $session } from 'models/session';
import { CreatedURLCopyClipboard } from 'components/url';

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

let Form = () => {
  let urlField = useStore($urlField);
  let urlFieldError = useStore($urlFieldError);
  let isFormLoading = useStore($isFormLoading);

  async function handleSubmit(e) {
    e.preventDefault();
    formSubmitted();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <StandardInput
        value={urlField}
        onChange={urlFieldChange}
        error={urlField && urlFieldError}
        disabled={isFormLoading}
        id="url"
        inputMode="url"
        label="Enter your url which you want to reduce"
        placeholder="https://twitter.com"
        required
        maxlegth="10000"
      />

      <FormButtons />
    </form>
  );
};

let ListCreatedURLs = () => {
  let listCreatedURLs = useList($listCreatedURLs, CreatedURLCopyClipboard);

  if (!listCreatedURLs.length) return null;

  return (
    <div role="feed" className={styles['created-urls_list']}>
      {listCreatedURLs}
    </div>
  );
};

let FormButtons = () => {
  let isSubmitEnabled = useStore($isSubmitEnabled);
  let user = useStore($session).user;

  return (
    <div className={styles['form_buttons']}>
      <Button disabled={!isSubmitEnabled}>Create</Button>
      <Link href={user ? '/settings/future-urls' : '/login'} passHref>
        <Button
          tag="a"
          className={styles['link-opening-settings']}
          title={
            user
              ? 'Settings for your future URLs'
              : 'Settings for future URLs. Please log in'
          }
        />
      </Link>
    </div>
  );
};
