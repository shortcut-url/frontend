import React from 'react';
import Head from 'next/head';
import { useStore } from 'effector-react';

import { MainLayout } from 'components/layout';
import { Input } from 'components/form';
import { Button } from 'components/button';
import { Error } from 'components/error';
import {
  $emailField,
  $passwordField,
  formSubmitted,
  emailFieldChange,
  passwordFieldChange,
  loginFetching
} from 'models/page/login/email';
import styles from './index.module.css';

export default () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <MainLayout>
        <Form />
      </MainLayout>
    </>
  );
};

export let Form = () => {
  let isFormLoading = useStore(loginFetching.isLoading);
  let formError = useStore(loginFetching.error);

  let handleSubmit = (event) => {
    event.preventDefault();
    formSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {formError && <Error>{formError}</Error>}

      <Email />
      <Password />
      <Button disabled={isFormLoading} className={styles['form_button']}>
        Log in
      </Button>
    </form>
  );
};

export let Email = () => {
  let emailField = useStore($emailField);
  let isFormLoading = useStore(loginFetching.isLoading);

  return (
    <Input
      value={emailField}
      onChange={emailFieldChange}
      containerClass={styles['form_group']}
      disabled={isFormLoading}
      id="email"
      label="Email"
      type="email"
      placeholder="example@example.com"
      required
    />
  );
};

export let Password = () => {
  let passwordField = useStore($passwordField);
  let isFormLoading = useStore(loginFetching.isLoading);

  return (
    <Input
      value={passwordField}
      onChange={passwordFieldChange}
      containerClass={styles['form_group']}
      disabled={isFormLoading}
      id="password"
      label="Password"
      type="password"
      placeholder="Password"
      minLength="6"
      maxLength="64"
      required
    />
  );
};
