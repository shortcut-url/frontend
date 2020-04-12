import React from 'react';

import { Avatar } from './avatar';
import { AvatarContainer } from './container';

export let ProfileAvatar = ({ containerClass }) => (
  <AvatarContainer containerClass={containerClass}>
    <Avatar />
  </AvatarContainer>
);
