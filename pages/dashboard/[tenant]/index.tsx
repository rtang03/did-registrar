import type { NextPage } from 'next';
import type { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import AccessDenied from '../../../components/AccessDenied';
import Layout from '../../../components/Layout';
import type { UserInfo } from '../../../types';

// use server side rendering
const Page: NextPage<any> = ({ session }) => {
  const [content, setContent] = useState<UserInfo>();

  useEffect(() => {
    fetch('/api/protected/userinfo')
      .then((res) => res.json())
      .then((json) => json?.content && setContent(json.content));
  }, [session]);

  return (
    <Layout title="Tenant2">
      {session ? <pre>{JSON.stringify(content, null, 2)}</pre> : <AccessDenied />}
    </Layout>
  );
};

export const getServerSideProps = async (context: NextPageContext) => ({
  props: { session: await getSession(context) },
});

export default Page;
