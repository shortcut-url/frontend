import React from 'react';

import { sessionAPI } from 'api/session';
import { addUserSession } from 'models/session';
import '../global.css';

export default function MyApp({ Component, pageProps, user }) {
  addUserSession(user);

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ ctx }) => {
  let res = await sessionAPI.getInitialSession({
    headers: {
      cookie: ctx.req ? ctx.req.headers.cookie : null
    }
  });

  if (!res.ok) return {};

  let user = res.data;

  return { user };
};
