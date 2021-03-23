import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import Layout from '../components/Layout';

const Index = () => {
  const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  //
  // if (user) {
  //   return (
  //     <div>
  //       Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
  //     </div>
  //   );
  // }
  //
  // return <a href="/api/auth/login">Login</a>;

  return (
    <Layout title="Home" isLoading={isLoading} user={user}>
      Body
    </Layout>
  );
};

export default Index;
