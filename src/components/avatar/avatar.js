import React from 'react';
import { useStore } from 'effector-react';

import { AvatarManagement } from './management';
import { $session } from 'models/session';
import s from './avatar.module.css';
import { classNames } from 'lib/utils/class-names';

export const Avatar = ({ containerClass, withAvatarManagement }) => {
  let rootClassName = classNames(s.root, containerClass, 'flat');

  return (
    <div className={rootClassName}>
      {withAvatarManagement && (
        <AvatarManagement>
          <AvatarContent />
        </AvatarManagement>
      )}

      {!withAvatarManagement && <AvatarContent />}
    </div>
  );
};

const AvatarContent = () => {
  let { srcAvatar, name } = useStore($session).user;

  /* Display the avatar if it's there, or the fallback */
  if (srcAvatar) {
    return (
      <picture>
        <source srcSet={`${srcAvatar}?type=webp`} type="image/webp" />

        <img
          src={srcAvatar}
          className={s.img}
          width="100"
          height="100"
          alt="Your avatar"
        />
      </picture>
    );
  }

  let fallbackClassName = classNames(s['fallback'], 'pressed');

  return (
    <div className={fallbackClassName} aria-hidden="true">
      {name[0]}
    </div>
  );
};
