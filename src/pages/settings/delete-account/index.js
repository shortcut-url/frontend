import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import styles from './index.module.css';
import { MainLayout } from 'components/layout';
import { Button } from 'components/button';
import { Input } from 'components/form';
import { $session } from 'models/session';
import {
  $usernameField,
  usernameFieldChange,
  $usernameFieldError,
  deleteAccountProcessing,
  $isFormLoading
} from 'models/page/settings/delete-account';

export default () => {
  useEffect(() => {
    let user = $session.getState().user;

    if (!user) Router.push('/login');
  });

  return (
    <>
      <Head>
        <title>Delete account</title>
      </Head>
      <MainLayout>
        <DeleteAccountCard />
      </MainLayout>
    </>
  );
};

let DeleteAccountCard = () => {
  return (
    <div className={styles['delete-account_container']}>
      <div className={`${styles['delete-account-card']} flat`}>
        <h1 className={styles['delete-account-card_heading']}>
          Delete account
        </h1>
        <p>
          When you delete your account, all previously created URLs and other
          data are also deleted.
        </p>

        <p>
          You will have 10 days to write to our mail to restore your account.
          Otherwise, it will be deleted forever.
        </p>

        <AccountDeletionConfirmForm />
      </div>
    </div>
  );
};

let AccountDeletionConfirmForm = () => {
  let userSession = useStore($session).user;

  let usernameField = useStore($usernameField);
  let usernameFieldError = useStore($usernameFieldError);
  let isFormLoading = useStore($isFormLoading);

  async function handleSubmit(event) {
    event.preventDefault();
    deleteAccountProcessing();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles['delete-account_confirm-form']}
    >
      <Input
        value={usernameField}
        onChange={usernameFieldChange}
        disabled={isFormLoading}
        label={
          <span>
            If you are sure that you want to delete the account, enter the{' '}
            <b style={{ color: 'var(--base-accent)' }}>{userSession.name}</b> in
            the input below
          </span>
        }
        type="text"
        placeholder={userSession.name}
        autoComplete="username"
        spellCheck="false"
        required
      />

      <Button
        className={styles['confirm-form_submit-button']}
        disabled={!usernameFieldError}
        variant="danger"
      >
        I'm sure I want to delete my account
      </Button>
    </form>
  );
};
