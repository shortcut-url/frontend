import React from 'react';
import Link from 'next/link';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { Icon } from 'components/icon';
import styles from './main.module.css';
import buttonsStyles from 'components/button/index.module.css';

export const MainNavigation = () => {
  let user = useStore($session);

  function Profile() {
    if (!user) return null;

    return (
      <li className={styles.profile}>
        <img
          src="/images/no-avatar.jpg"
          alt="Your avatar"
          className={styles['profile_avatar']}
          width="100"
          height="100"
        />
        <div className={styles['profile_username']}>{user.username}</div>
        <Link href="/profile">
          <a className={buttonsStyles['button_accent']}>Your profile</a>
        </Link>
      </li>
    );
  }

  function AccountMenu() {
    if (user) return null;

    return (
      <>
        <ListHeading nameIcon="user">Account</ListHeading>
        <li>
          <MenuLink href="/join">Create an account</MenuLink>
        </li>
        <li>
          <MenuLink href="/login">Login</MenuLink>
        </li>
      </>
    );
  }

  return (
    <nav className={`${styles.nav} flat`}>
      <div className={styles['layout_menu']}>
        <ul className={styles.menu}>
          <li>
            <Link href="/">
              <a className={styles['menu_home']}>
                <Icon name="globe" size="23" /> Shortcut-link.com
              </a>
            </Link>
          </li>
          <ListHeading nameIcon="box">Main</ListHeading>
          <li>
            <MenuLink href="/">Home</MenuLink>
          </li>
          <AccountMenu />
          <Profile />
        </ul>
      </div>
    </nav>
  );
};

function ListHeading({ nameIcon, children }) {
  return (
    <h2 className={styles['menu_heading']}>
      <Icon name={nameIcon} size="23" />
      {children}
    </h2>
  );
}

function MenuLink({ href, children, ...props }) {
  return (
    <Link href={href}>
      <a
        className={`${styles['menu_link']} concave_hover pressed_active`}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}
