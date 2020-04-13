import React from 'react';

import { Avatar } from './avatar';
import { AvatarContainer } from './container';
import { AvatarManagement } from './management';

export let ProfileAvatar = ({ containerClass, withAvatarManagement }) => (
  <AvatarContainer containerClass={containerClass}>
    {withAvatarManagement && (
      <AvatarManagement>
        <Avatar />
      </AvatarManagement>
    )}

    {!withAvatarManagement && <Avatar />}
  </AvatarContainer>
);
