import React from 'react';

import s from './index.module.css';
import { commonErrorStyle } from 'components/error';
import { classNames } from 'lib/utils/class-names';

export const InputText = ({
  label,
  error = undefined,
  id,
  containerClass = undefined,
  ...props
}) => {
  let inputClassName = classNames(s.input, 'pressed');

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}

      <input id={id} className={inputClassName} type="text" {...props} />

      {error && (
        <label htmlFor={id} className={commonErrorStyle.error}>
          {error}
        </label>
      )}
    </div>
  );
};
