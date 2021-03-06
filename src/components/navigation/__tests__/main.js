import React from 'react';
import * as jest from 'jest';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import { addUserSession } from 'models/session';

import { MainNavigation } from '../index';

jest.mock('next/link', () => {
  return ({ children }) => children;
});

describe('Main navigation', () => {
  it('Link to the home page', () => {
    let { getByText } = render(<MainNavigation />);

    getByText(
      (text, el) =>
        el.tagName === 'A' &&
        text.toLowerCase() === 'shortcut-url.com' &&
        el.getAttribute('rel') === 'home'
    );
  });

  let linkLogIn = (text, el) => el.tagName === 'A' && text === 'Login';

  describe('Missing user session', () => {
    it('No profile link', () => {
      let { queryByText } = render(<MainNavigation />);

      expect(
        queryByText((text, el) => el.tagName === 'A' && text === 'Your profile')
      ).toBeNull();
    });

    it('Link to login page', () => {
      let { getByText } = render(<MainNavigation />);

      getByText(linkLogIn);
    });
  });

  describe('There is a user session', () => {
    it('No link to login page', () => {
      act(() => {
        addUserSession({ name: 'Test' });
      });

      let { queryByText } = render(<MainNavigation />);

      expect(queryByText(linkLogIn)).toBeNull();
    });

    it('Profile link', () => {
      act(() => {
        addUserSession({ name: 'Test' });
      });

      let { getByText } = render(<MainNavigation />);

      getByText((text, el) => el.closest('a') && text === 'Your profile');
    });
  });
});
