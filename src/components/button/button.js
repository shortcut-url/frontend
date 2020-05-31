import React, { forwardRef } from 'react';

import styles from './button.module.css';
import { classNames } from 'lib/utils/class-names';

const ButtonBase = (
  {
    tag: Tag = 'button',
    variant = 'default',
    color = 'default',
    className = '',
    disabled = false,
    children,
    ...props
  },
  ref
) => {
  let rootClassName = classNames(
    styles.reset_button,
    styles.root,
    variant === 'default' &&
      (disabled ? 'concave' : 'flat convex_hover pressed_active'),
    (variant === 'accent' || variant === 'danger') &&
      classNames(styles.color_button, styles[`button_${variant}`]),
    Tag !== 'button' && disabled && styles.disabled,
    className
  );

  return (
    <Tag ref={ref} className={rootClassName} disabled={disabled} {...props}>
      <span className={styles.text}>{children}</span>
    </Tag>
  );
};

const Button = forwardRef(ButtonBase);

export { Button, styles as ButtonStyles };
