import React, { forwardRef } from 'react';

import styles from './index.module.css';

export let Button = forwardRef(
  (
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
    let tagNotButton = Tag !== 'button';

    let classes = defineButtonVariant({
      variant,
      disabled
    });

    classes += ` ${className}`;

    if (tagNotButton && disabled) {
      classes += ` ${styles.disabled}`;
    } else {
      props.disabled = disabled;
    }

    classes += defineButtonColor({
      color
    });

    return (
      <Tag ref={ref} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

let defineButtonVariant = ({ variant, disabled }) => {
  let classes = styles.reset_button;

  switch (variant) {
    case 'default':
      classes += `
        ${disabled ? 'concave' : 'flat convex_hover pressed_active'}
      `;
      break;

    case 'accent':
      classes += `
        ${styles.color_button}
        ${styles.button_accent}
      `;
      break;

    case 'danger':
      classes += `
        ${styles.color_button}
        ${styles.button_danger}
      `;
      break;

    default:
      break;
  }

  return classes;
};

let defineButtonColor = ({ color }) => {
  let classes = '';

  return classes;
};

export { styles as ButtonStyles };
