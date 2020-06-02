import React from 'react';
import { useStore } from 'effector-react';

import { AvatarManagement } from './management';
import { $session } from 'models/session';
import styles from './avatar.module.css';

export let Avatar = ({ containerClass, withAvatarManagement }) => (
  <div className={`flat ${styles.root} ${containerClass}`}>
    {withAvatarManagement && (
      <AvatarManagement>
        <AvatarContent />
      </AvatarManagement>
    )}

    {!withAvatarManagement && <AvatarContent />}
  </div>
);

let AvatarContent = () => {
  let { srcAvatar, name } = useStore($session).user;

  if (srcAvatar) {
    return (
      <picture>
        <source srcSet={`${srcAvatar}?type=webp`} type="image/webp" />

        <img
          src={srcAvatar}
          className={styles.avatar_img}
          width="100"
          height="100"
          alt="Your avatar"
        />
      </picture>
    );
  }

  return (
    <div className={`${styles['avatar_no-image']} pressed`} aria-hidden="true">
      {name[0]}
    </div>
  );
};
