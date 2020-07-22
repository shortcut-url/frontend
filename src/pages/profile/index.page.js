import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStore } from 'effector-react';

import { $session } from 'models/session';
import { MainLayout } from 'components/layout';
import {
  addCreatedURLsCurrentUser,
  resetCreatedURLsCurrentUser
} from './store';
import { userAPI } from 'api/user';
import { ListCreatedURLs } from './_list-created-urls';
import { Header } from './_header';

export default ({ listCreatedURLsCurrentUser }) => {
  let currentUser = useStore($session).user;

  useEffect(() => {
    if (!currentUser) Router.push('/login');
  }, [currentUser]);

  useEffect(() => {
    addCreatedURLsCurrentUser(listCreatedURLsCurrentUser);

    return () => {
      resetCreatedURLsCurrentUser();
    };
  }, [listCreatedURLsCurrentUser]);

  return (
    <>
      <Head>
        <title>Your profile</title>
      </Head>

      <MainLayout>
        <Header />

        <ListCreatedURLs />
      </MainLayout>
    </>
  );
};

export let getServerSideProps = async (ctx) => {
  let getCreatedURLsCurrentUserResponse = await userAPI.getCreatedURLs({
    startIndex: 0,
    stopIndex: 20,
    options: {
      headers: {
        cookie: ctx.req ? ctx.req.headers.cookie : null
      }
    }
  });

  return {
    props: {
      listCreatedURLsCurrentUser: getCreatedURLsCurrentUserResponse.data
    }
  };
};
