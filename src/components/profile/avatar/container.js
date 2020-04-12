import React from 'react';

import styles from './index.module.css';

export const AvatarContainer = ({ containerClass = '', ...props }) => {
  return (
    <div className={`flat ${styles['avatar-container']} ${containerClass}`}>
      {props.children}
    </div>
  );
};
