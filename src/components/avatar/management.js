import React from 'react';
import { useStore } from 'effector-react';

import styles from './management.module.css';
import { $session } from 'models/session';
import { deleteAvatar, uploadAvatar } from 'models/session/user';

export const AvatarManagement = (props) => {
  let { srcAvatar } = useStore($session).user;

  function handleAvatarUpload(event) {
    let formData = new FormData();

    let image = event.target.files[0];

    formData.append('image', image, image.name);

    uploadAvatar(formData);
  }

  return (
    <div className={styles.root}>
      <div className={styles['control']}>
        <input
          onChange={handleAvatarUpload}
          className={styles['control_new-avatar']}
          title="Upload new avatar"
          type="file"
          accept="image/*"
        />

        {!!srcAvatar && (
          <button
            onClick={deleteAvatar}
            className={styles['control_delete-avatar']}
            title="Delete current avatar"
            type="button"
          />
        )}
      </div>

      {props.children}
    </div>
  );
};
