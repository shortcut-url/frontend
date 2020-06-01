import React from 'react';

import styles from './index.module.css';
import { commonErrorStyle } from 'components/error';

export let InputText = ({
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
        <label htmlFor={id} className={commonErrorStyle.error}>
          {error}
        </label>
      )}
    </div>
  );
};
