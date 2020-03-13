import React from 'react';

import styles from './index.module.css';

export const ButtonRaised = ({
  tag: Tag = 'button',
  children,
  className = '',
  ...props
}) => (
  <Tag
    className={`${styles.button} ${className} flat ${
      props.disabled ? 'concave' : 'convex_hover pressed_active'
    }`}
    {...props}
  >
    {children}
  </Tag>
);
