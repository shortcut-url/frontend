import React from 'react';

import styles from './index.module.css';

export const StandardInput = ({
  label,
  error = undefined,
  id,
  containerClass = undefined,
  ...props
}) => {
  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${styles.input} pressed`}
        type="text"
        {...props}
      />
      {error && (
        <label htmlFor={id} className={styles.error} title={`Error: ${error}`}>
          {error}
        </label>
      )}
    </div>
  );
};
