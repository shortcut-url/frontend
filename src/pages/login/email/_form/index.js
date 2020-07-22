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

function LoginEmailForm() {
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
}

function Email() {
  let emailField = useStore($emailField);
  let isFormLoading = useStore(loginFetching.isLoading);

  return (
    <InputText
      value={emailField}
      onChange={emailFieldChange}
      containerClass={s.group}
      disabled={isFormLoading}
      id="email"
      label="Email"
      type="email"
      placeholder="example@example.com"
      required
    />
  );
}

function Password() {
  let passwordField = useStore($passwordField);
  let isFormLoading = useStore(loginFetching.isLoading);

  return (
    <InputText
      value={passwordField}
      onChange={passwordFieldChange}
      containerClass={s.group}
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
}

export { LoginEmailForm };
