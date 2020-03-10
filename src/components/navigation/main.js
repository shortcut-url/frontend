import React from 'react';
import Link from 'next/link';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import styles from './main.module.css';
import buttonsStyles from 'components/button/index.module.css';

export const MainNavigation = () => {
  let user = useStore($session);

  let Profile = () => (
    <div className={styles.profile}>
      <img
        src="/images/no-avatar.jpg"
        alt="Your avatar"
        className={styles['profile_avatar']}
        width="100"
        height="100"
      />
      <div className={styles['profile_username']} title="Your username">
        {user.username}
      </div>

      <Link href="/profile">
        <a className={`${buttonsStyles['button_accent']} profile_button`}>
          Your profile
        </a>
      </Link>
    </div>
  );

  let AuthNavigationMenu = () => (
    <>
      <h2 className={`${styles['menu_heading']} ${styles['heading-account']}`}>
        Account
      </h2>
      <ul className={styles.list}>
        <ListLink href="/join">Create an account</ListLink>
        <ListLink href="/login">Login</ListLink>
      </ul>
    </>
  );

  return (
    <nav className={`${styles.menu} flat`}>
      <Link href="/">
        <a className={styles['menu_home']} title="Go to the home page.">
          <picture>
            <img
              src="icons/globe.svg"
              width="23"
              height="23"
              alt="Logo Shortcut-link"
            />
          </picture>
          <span>Shortcut-link.com</span>
        </a>
      </Link>

      {!user && <AuthNavigationMenu />}
      {user && <Profile />}
    </nav>
  );
};

function ListLink({ href, children, ...props }) {
  return (
    <li>
      <Link href={href}>
        <a
          className={`${styles['list_link']} concave_hover pressed_active`}
          {...props}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}
