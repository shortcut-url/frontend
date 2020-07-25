import React from 'react';
import { useStore } from 'effector-react';

import commonStyle from '../index.module.css';
import s from './index.module.css';
import { $createdURL } from '../store';
import { addNotification } from 'models/notification';
import { ButtonStyles } from 'components/button';
import { classNames } from 'lib/utils/class-names';
import { copyToClipboard } from 'lib/utils/clipboard';

function MainDataCreatedURL() {
  let createdURL = useStore($createdURL);

  let urlWithServerDomain = new URL(
    createdURL.url,
    process.env.NEXT_PUBLIC_SHORTCUT_SERVER
  );

  function copyOriginalUrlToClipboard(event) {
    copyToClipboard(createdURL.originalURL);

    addNotification({
      content: 'Original URL is copied 🎉',
      coords: { top: event.pageY, left: event.pageX },
      element: event.target
    });
  }

  function copyShortUrlToClipboard(event) {
    copyToClipboard(urlWithServerDomain);

    addNotification({
      content: 'Short URL is copied 🎉',
      coords: { top: event.pageY, left: event.pageX },
      element: event.target
    });
  }

  let rootClassName = classNames('flat', commonStyle.card);
  let buttonOriginalURLClassName = classNames(
    ButtonStyles.reset_button,
    s['original-url-button']
  );

  return (
    <section className={rootClassName}>
      <button
        onClick={copyShortUrlToClipboard}
        className={s['url-heading-button']}
        title="Click to copy url to clipboard"
        type="button"
      >
        <h1>{urlWithServerDomain.toString()}</h1>
      </button>

      <button
        onClick={copyOriginalUrlToClipboard}
        className={buttonOriginalURLClassName}
        title={
          'Click to copy the original URL to the clipboard.' +
          '\n\n' +
          createdURL.originalURL
        }
        type="button"
      >
        Original URL: {createdURL.originalURL}
      </button>
    </section>
  );
}

export { MainDataCreatedURL };
