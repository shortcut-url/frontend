import React from 'react';
import { useStore } from 'effector-react';

import s from './index.module.css';
import {
  loginFetching,
  formSubmitted,
  $emailField,
  emailFieldChange,
  $passwordField,
  passwordFieldChange
} from '../store';
import { Error } from 'components/error';
import { Button } from 'components/button';
import { InputText } from 'components/form';

export const LoginEmailForm = () => {
  let isFormLoading = useStore(loginFetching.isLoading);
  let formError = useStore(loginFetching.error);

  let handleSubmit = (event) => {
    event.preventDefault();
    formSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className={s.root}>
      {formError && <Error>{formError}</Error>}

      <Email />

      <Password />

      <Button disabled={isFormLoading} className={s.button}>
        Log in
      </Button>
    </form>
  );
};

const Email = () => {
  let emailField = useStore($emailField);
  let isFormLoading = useStore(loginFetching.isLoading);

  return (
    <InputText
      value={emailField}
      onChange={emailFieldChange}
      disabled={isFormLoading}
      id="email"
      label="Email"
      type="email"
      placeholder="example@example.com"
      required
    />
  );
};

const Password = () => {
  let passwordField = useStore($passwordField);
  let isFormLoading = useStore(loginFetching.isLoading);

  return (
    <InputText
      value={passwordField}
      onChange={passwordFieldChange}
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
