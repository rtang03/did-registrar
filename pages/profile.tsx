import type { NextPage, NextPageContext } from 'next';
import { useSession, getSession } from 'next-auth/client';
import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AccessDenied from '../components/accessDenied';

const Page: NextPage<any> = () => {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    fetch('api/userinfo')
      .then((res) => res.json())
      .then((json) => json?.content && setContent(json.content));
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  if (!session)
    return (
      <Layout title="Profile">
        <AccessDenied />
      </Layout>
    );

  return (
    <Layout title="Profile">
      {loading ? (
        <Fragment />
      ) : (
        <>
          <p>I am {session?.user?.name}</p>
          <p>{content}</p>
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context: NextPageContext) => ({
  props: {
    session: await getSession(context),
  },
});

export default Page;
