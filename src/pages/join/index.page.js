import React from 'react';
import Head from 'next/head';
import { useStore } from 'effector-react';

import { MainLayout } from 'components/layout';
import { InputText } from 'components/form';
import { Button } from 'components/button';
import { Error } from 'components/error';
import {
  $emailField,
  $passwordField,
  $usernameField,
  formSubmitted,
  emailFieldChange,
  passwordFieldChange,
  registerFetching,
  usernameFieldChange
} from 'models/page/join';
import styles from './index.module.css';

export default () => {
  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>

      <MainLayout>
        <Form />
      </MainLayout>
    </>
  );
};

export let Form = () => {
  let isFormLoading = useStore(registerFetching.isLoading);
  let ListErrorsForm = useStore(registerFetching.error);

  let handleSubmit = (event) => {
    event.preventDefault();
    formSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {ListErrorsForm && <Error>{ListErrorsForm}</Error>}

      <Email />

      <Username />

      <Password />

      <Button disabled={isFormLoading} className={styles['form_button']}>
        Sign up
      </Button>
    </form>
  );
};

export let Email = () => {
  let emailField = useStore($emailField);
  let isFormLoading = useStore(registerFetching.isLoading);

  return (
    <InputText
      value={emailField}
      onChange={emailFieldChange}
      containerClass={styles['form_group']}
      disabled={isFormLoading}
      id="email"
      label="Email"
      type="email"
      name="email"
      placeholder="example@example.com"
      required
    />
  );
};

export let Username = () => {
  let usernameField = useStore($usernameField);
  let isFormLoading = useStore(registerFetching.isLoading);

  return (
    <InputText
      value={usernameField}
      onChange={usernameFieldChange}
      containerClass={styles['form_group']}
      disabled={isFormLoading}
      id="username"
      label="Username"
      type="text"
      name="username"
      placeholder="Example"
      autoComplete="username"
      autoCapitalize="off"
      spellCheck="false"
      minLength="3"
      maxLength="32"
      required
    />
  );
};

export let Password = () => {
  let passwordField = useStore($passwordField);
  let isFormLoading = useStore(registerFetching.isLoading);

  return (
    <InputText
      value={passwordField}
      onChange={passwordFieldChange}
      containerClass={styles['form_group']}
      disabled={isFormLoading}
      id="password"
      label="Password"
      type="password"
      name="password"
      placeholder="Password"
      autoComplete="new-password"
      minLength="6"
      maxLength="64"
      required
    />
  );
};
