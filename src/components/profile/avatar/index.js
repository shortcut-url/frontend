import React from 'react';

import styles from './index.module.css';

export const ProfileAvatar = ({ user }) => {
  let Avatar = () => {
    let avatar = user.avatar;

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
            className={styles.avatar_img}
            width="100"
            height="100"
            alt="Your avatar"
          />
        </picture>
      );
    }

    return (
      <div
        className={`${styles['avatar_no-image']} pressed`}
        aria-hidden="true"
      >
        {user.username[0]}
      </div>
    );
  };

  return (
    <div className={`${styles.avatar_container} flat`}>
      <Avatar />
    </div>
  );
};
