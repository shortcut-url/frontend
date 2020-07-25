import React, { forwardRef } from 'react';

import s from './created-url-card.module.css';
import { classNames } from 'lib/utils/class-names';
import { ButtonStyles } from 'components/button';
import { addNotification } from 'models/notification';
import { copyToClipboard } from 'lib/utils/clipboard';

export const CardBase = (
  {
    tag: Tag = 'button',
    url,
    originalURL,
    WithCopyShortUrlToClipboard = false,
    ...props
  },
  ref
) => {
  let urlWithServerDomain = new URL(
    url,
    process.env.NEXT_PUBLIC_SHORTCUT_SERVER
  );

  let rootClassName = classNames(
    ButtonStyles.reset_button,
    'flat',
    'convex_hover',
    'pressed_active',
    s.card
  );

  function copyShortUrlToClipboard(event) {
    copyToClipboard(urlWithServerDomain);

    addNotification({
      content: 'Short URL is copied 🎉',
      coords: { top: event.pageY, left: event.pageX },
      element: event.target
    });
  }

  return (
    <Tag
      className={rootClassName}
      onClick={WithCopyShortUrlToClipboard && copyShortUrlToClipboard}
      ref={ref}
      {...props}
    >
      <h3 className={s['card_heading']}>{urlWithServerDomain.toString()}</h3>

      <div className={s['card_original-url']} title={originalURL}>
        Original url: {originalURL}
      </div>
    </Tag>
  );
};

let CreatedUrlCard = forwardRef(CardBase);

export { CreatedUrlCard };
