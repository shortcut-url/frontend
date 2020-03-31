import React from 'react';

import { sessionAPI } from 'api/session';
import { addUserSession } from 'models/session';
import '../global.css';

export default function MyApp({ Component, pageProps, user }) {
  addUserSession(user);

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ ctx }) => {
  let getInitialSession = await sessionAPI.getInitialSession({
    options: {
      headers: {
        cookie: ctx.req ? ctx.req.headers.cookie : null
      }
    }
  });

  if (!getInitialSession.ok) return {};

  let user = getInitialSession.data;

  return { user };
};
