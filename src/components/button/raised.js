import React from 'react';

import styles from './index.module.css';

export const ButtonRaised = ({ children, className = '', ...props }) => (
  <button
    className={`${styles.button} ${className} flat ${
      props.disabled ? 'concave' : 'convex_hover pressed_active'
    }`}
    {...props}
  >
    {children}
  </button>
);
