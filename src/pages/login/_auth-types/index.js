import React from 'react';
import Link from 'next/link';

import s from './index.module.css';
import { ButtonStyles, Button } from 'components/button';

function AuthTypes() {
  return (
    <ul className={s['list-auth-types']}>
      <li>
        <Button
          tag="a"
          className={`${s.button} ${s['button_google']}`}
          href={`${process.env.NEXT_PUBLIC_DEPLOYMENT_SERVER}/auth/google`}
        >
          Log in with Google
        </Button>
      </li>

      <li>
        <Button
          tag="a"
          className={`${s.button} ${s['button_twitter']}`}
          href={`${process.env.NEXT_PUBLIC_DEPLOYMENT_SERVER}/auth/twitter`}
        >
          Log in with Twitter
        </Button>
      </li>

      <li>
        <Button
          tag="a"
          className={`${s.button} ${s['button_email']}`}
          href="/login/email"
        >
          Log in with Email
        </Button>
      </li>

      <li>
        <hr className={s.hr} />
        <Link href="/join">
          <a
            className={`
              ${ButtonStyles.reset_button}
              ${s['link_create-account']}
            `}
          >
            Or, register using mail
          </a>
        </Link>
      </li>
    </ul>
  );
}

export { AuthTypes };
