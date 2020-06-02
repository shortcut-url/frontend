import React from 'react';

import styles from './index.module.css';

export let Checkbox = ({
  children,
  containerClass = '',
  disabled = false,
  ...props
}) => {
  return (
    <label className={`${styles.check} ${containerClass}`}>
      <input
        className={`
          ${styles['check_input']}
          ${disabled ? 'convex' : undefined}
          ${!disabled ? 'flat concave_hover pressed_active' : undefined}
        `}
        type="checkbox"
        disabled={disabled}
        {...props}
      />

      {children}
    </label>
  );
};
