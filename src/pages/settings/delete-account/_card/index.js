import React from 'react';
import { useStore } from 'effector-react';

import s from './index.module.css';
import { Button } from 'components/button';
import { InputText } from 'components/form';
import {
  deleteAccountProcessing,
  $usernameField,
  $usernameFieldError,
  $isFormLoading,
  usernameFieldChange
} from './store';
import { $session } from 'models/session';

export const DeleteAccountCard = () => {
  return (
    <div className={s['delete-account_container']}>
      <div className={`${s['delete-account-card']} flat`}>
        <h1 className={s['delete-account-card_heading']}>Delete account</h1>

        <p>
          When you delete your account, all previously created URLs and other
          data are also deleted.
        </p>

        <p>
          You will have 10 days to write to our mail to restore your account.
          Otherwise, it will be deleted forever.
        </p>

        <AccountDeletionForm />
      </div>
    </div>
  );
};

const AccountDeletionForm = () => {
  let userSession = useStore($session).user;

  let usernameField = useStore($usernameField);
  let usernameFieldError = useStore($usernameFieldError);
  let isFormLoading = useStore($isFormLoading);

  async function handleSubmit(event) {
    event.preventDefault();
    deleteAccountProcessing();
  }

  return (
    <form onSubmit={handleSubmit} className={s['delete-account_confirm-form']}>
      <InputText
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

      <Button disabled={!usernameFieldError} variant="danger">
        I'm sure I want to delete my account
      </Button>
    </form>
  );
};
