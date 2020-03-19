import React, { forwardRef } from 'react';

import styles from './index.module.css';

export const Button = forwardRef(
  (
    {
      tag: Tag = 'button',
      variant = 'raised',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
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
      <Tag ref={ref} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);
