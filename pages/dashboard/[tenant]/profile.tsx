import type { NextPage, NextPageContext } from 'next';
import { useSession, getSession } from 'next-auth/client';
import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import AccessDenied from '../../../components/accessDenied';
import type { UserInfo } from '../../../types';

const Page: NextPage<any> = () => {
  const [session, loading] = useSession();
  const [content, setContent] = useState<UserInfo>();

  useEffect(() => {
    fetch('/api/protected/userinfo')
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
      {loading ? <Fragment /> : <pre>{JSON.stringify(content, null, 2)}</pre>}
    </Layout>
  );
};

export const getServerSideProps = async (context: NextPageContext) => ({
  props: {
    session: await getSession(context),
  },
});

export default Page;
