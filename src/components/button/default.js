import React from 'react';

import styles from './index.module.css';

export const Button = ({
  tag: Tag = 'button',
  variant = 'raised',
  className = '',
  children,
  ...props
}) => {
  let classes;

  switch (variant) {
    case 'raised':
      classes = `${styles.button} ${className} flat ${
        props.disabled ? 'concave' : 'convex_hover pressed_active'
      }`;
      break;

    default:
      break;
  }

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};
