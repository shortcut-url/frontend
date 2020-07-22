import React from 'react';
import { useStore } from 'effector-react';
import Link from 'next/link';

import s from './index.module.css';
import {
  $urlField,
  $urlFieldError,
  $isFormLoading,
  formSubmitted,
  urlFieldChange,
  $isSubmitEnabled
} from '../store';
import { Button } from 'components/button';
import { InputText } from 'components/form';
import { $session } from 'models/session';

function Form() {
  let urlField = useStore($urlField);
  let urlFieldError = useStore($urlFieldError);
  let isFormLoading = useStore($isFormLoading);

  async function handleSubmit(e) {
    e.preventDefault();
    formSubmitted();
  }

  return (
    <form onSubmit={handleSubmit} className={s.root}>
      <InputText
        value={urlField}
        disabled={isFormLoading}
        onChange={urlFieldChange}
        error={urlField && urlFieldError}
        id="url"
        inputMode="url"
        label="Enter your url which you want to reduce"
        placeholder="https://twitter.com"
        maxlegth="10000"
        enterkeyhint="enter"
        required
      />

      <Buttons />
    </form>
  );
}

function Buttons() {
  let isSubmitEnabled = useStore($isSubmitEnabled);
  let user = useStore($session).user;

  return (
    <div className={s.group_buttons}>
      <Button disabled={!isSubmitEnabled}>Create</Button>

      <Link href={user ? '/settings/future-urls' : '/login'} passHref>
        <Button
          tag="a"
          className={s['button_opening-settings']}
          title={
            user
              ? 'Settings for your future URLs'
              : 'Settings for future URLs. Please log in'
          }
        />
      </Link>
    </div>
  );
}

export { Form };
