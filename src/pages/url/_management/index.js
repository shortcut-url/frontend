import React from 'react';
import { useStore } from 'effector-react';

import commonStyle from '../index.module.css';
import s from './index.module.css';
import { $createdURL, deleteCreatedURL } from '../store';
import { Checkbox } from 'components/form';
import { changeParameterCreatedURL } from '../settings.store';
import { Button } from 'components/button';
import { classNames } from 'lib/utils/class-names';

function ManagementCreatedURL() {
  let { settings } = useStore($createdURL);

  let rootClassName = classNames('flat', commonStyle.card);

  return (
    <section className={rootClassName}>
      <h2>Management</h2>

      <ul className={s.list}>
        <li>
          <Checkbox
            checked={settings.trackingNumberTransitions}
            onChange={(event) =>
              changeParameterCreatedURL({
                name: 'trackingNumberTransitions',
                value: event.target.checked
              })
            }
          >
            Tracking the number of transitions on URL
          </Checkbox>
        </li>

        <li className={s['group-buttons']}>
          <Button
            onClick={() => {
              changeParameterCreatedURL({
                name: 'disabled',
                value: !settings.disabled
              });
            }}
            type="button"
          >
            {settings.disabled ? 'Enable URL' : 'Disable URL'}
          </Button>

          <Button onClick={deleteCreatedURL} variant="danger" type="button">
            Remove URL
          </Button>
        </li>
      </ul>
    </section>
  );
}

export { ManagementCreatedURL };
