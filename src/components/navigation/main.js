import React from 'react';
import Link from 'next/link';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import styles from './main.module.css';
import buttonsStyles from 'components/button/index.module.css';
import { ProfileAvatar } from 'components/profile/avatar';

export const MainNavigation = () => {
  let currentUser = useStore($session).user;

  return (
    <nav className={`${styles.menu} flat`}>
      <Link href="/">
        <a className={styles['menu_home']} title="Go to the home page.">
          <picture>
            <img
              src="/icons/globe.svg"
              width="23"
              height="23"
              alt="Logo Shortcut-link"
            />
          </picture>
          <span>Shortcut-link.com</span>
        </a>
      </Link>

      {!currentUser && <AuthNavigationMenu />}
      {currentUser && <LinkToProfileCurrentUser />}
    </nav>
  );
};

let ListLink = ({ href, children, ...props }) => {
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
};

let AuthNavigationMenu = () => (
  <>
    <h2 className={`${styles['menu_heading']} ${styles['heading-account']}`}>
      Account
    </h2>
    <ul className={styles.list}>
      <ListLink href="/login">Login</ListLink>
    </ul>
  </>
);

let LinkToProfileCurrentUser = () => {
  let currentUser = useStore($session).user;

  let Avatar = () => {
    let avatar = currentUser.avatar;

    /*
     * If the user does not have an avatar,
     * output the first character from his username
     */

    if (avatar) {
      return (
        <picture>
          <source srcSet={avatar.webP} type="image/webp" />
          <img
            src={avatar.src}
            className={styles.profile_avatar}
            width="100"
            height="100"
            alt="Your avatar"
          />
        </picture>
      );
    }

    return (
      <div
        className={`${styles['profile_no-avatar']} pressed`}
        aria-hidden="true"
      >
        {currentUser.username[0]}
      </div>
    );
  };

  return (
    <div className={styles.profile}>
      <ProfileAvatar user={currentUser} />

      <div className={styles['profile_username']} title="Your username">
        {currentUser.username}
      </div>

      <Link href="/profile">
        <a className={buttonsStyles.button_accent}>Your profile</a>
      </Link>
    </div>
  );
};
