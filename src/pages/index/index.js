import React, { useEffect } from 'react';
import Head from 'next/head';
import { useStore } from 'effector-react';

import Link from 'next/link';

import { MainLayout } from 'components/layouts';
import { StandardInput } from 'components/input';
import { Button } from 'components/button';
import {
  $urlField,
  urlFieldChange,
  $urlFieldError,
  $isSubmitEnabled,
  $listCreatedUrls,
  formSubmitted,
  $isFormLoading,
  clearListCreatedUrls
} from 'models/page/home';
import styles from './index.module.css';
import { $session } from 'models/session';

export default () => {
  useEffect(() => {
    return () => {
      clearListCreatedUrls();
    };
  });

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainLayout>
        <Form />
        <ListCreatedLinks />
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
        label="Enter the url of your link to be shortened"
        placeholder="https://twitter.com"
        required
        maxlegth="10000"
      />

      <Buttons />
    </form>
  );
};

let ListCreatedLinks = () => {
  let listCreatedUrls = useStore($listCreatedUrls);

  if (!listCreatedUrls.length) return null;

  function Item({ id, originalUrl }) {
    let idLinkWithDomain = `${process.env.apiServer}/${id}`;

    let copyLinkClipboard = () =>
      navigator.clipboard.writeText(idLinkWithDomain);

    return (
      <article key={id}>
        <button
          onClick={copyLinkClipboard}
          className={`
            ${styles['created-link']}
            flat
            concave_hover
            pressed_active
          `}
          title="Copy link to clipboard"
          type="button"
        >
          <h4>{idLinkWithDomain}</h4>
          <div
            className={styles['created-link_original-url']}
            title={originalUrl}
          >
            Original url: {originalUrl}
          </div>
        </button>
      </article>
    );
  }

  return (
    <div role="feed" className={styles['list-created-links']}>
      {listCreatedUrls.map(Item)}
    </div>
  );
};

let Buttons = () => {
  let isSubmitEnabled = useStore($isSubmitEnabled);
  let user = useStore($session).user;

  return (
    <div className={styles['form_buttons']}>
      <Button disabled={!isSubmitEnabled}>Create</Button>
      <Link href={user ? '/settings/future-links' : '/login'} passHref>
        <Button
          tag="a"
          className={styles['link_opening-settings']}
          title={
            user
              ? 'Settings for your future links'
              : 'Settings for links. Please log in'
          }
        />
      </Link>
    </div>
  );
};
