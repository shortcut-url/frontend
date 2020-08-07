import React from 'react';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { deleteAvatar, uploadAvatar } from 'models/session/user';

import s from './management.module.css';

export const AvatarManagement = (props) => {
  let userSession = useStore($session).user;

  function handleAvatarUpload(event) {
    let formData = new FormData();

    let image = event.target.files[0];

    formData.append('image', image, image.name);

    uploadAvatar(formData);
  }

  return (
    <div className={s.root}>
      <div className={s.control}>
        <input
          onChange={handleAvatarUpload}
          className={s['control_input']}
          title="Upload new avatar"
          type="file"
          accept="image/*"
        />

        {!!userSession.srcAvatar && (
          <button
            onClick={deleteAvatar}
            className={s['control_delete-button']}
            title="Delete current avatar"
            type="button"
          />
        )}
      </div>

      {props.children}
    </div>
  );
};
