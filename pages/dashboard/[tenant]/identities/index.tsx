import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AccessDenied from 'components/AccessDenied';
import Layout from 'components/Layout';
import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useStyles } from '../../../../utils';

const Page: NextPage<any> = ({ session }) => {
  const [data, setData] = useState();
  const classes = useStyles();

  useEffect(() => {
    fetch('/api/dids')
      .then((res) => res.json())
      .then((json) => json?.data && setData(json.data));
  }, [session]);

  return (
    <Layout title="Identity">
      {session ? (
        <>
          <Typography variant="h5">Identities</Typography>
          <Typography variant="caption">Setup decentralized identity. Learn more </Typography>
          <br />
          <br />
          <Link href="/dashboard/1/identities/id">
            <Button size="small" variant="contained">
              + CREATE IDENTITY
            </Button>
          </Link>
          <Divider />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      ) : (
        <AccessDenied />
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context: NextPageContext) => ({
  props: { session: await getSession(context) },
});

export default Page;
