import { createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccessDenied from 'components/AccessDenied';
import Layout from 'components/Layout';
import pick from 'lodash/pick';
import type { NextPage, NextPageContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { createKeyPair } from '../../../../utils';

interface State {
  did: string;
  address: string;
  publicKey: string;
  privateKey: string;
  didDocument: any;
  saveMode: boolean;
  showPrivateKey: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '85ch',
    },
  })
);

const Page: NextPage<{ session: Session }> = ({ session }) => {
  const classes = useStyles();
  const [values, setValues] = useState<State>({
    did: '',
    address: '',
    publicKey: '',
    privateKey: '',
    didDocument: null,
    saveMode: false,
    showPrivateKey: false,
  });

  const handleKeyGen = () => setValues({ ...values, ...createKeyPair(), saveMode: false });

  const handleSubmit = () => {
    setValues({ ...values, saveMode: true });
    console.log('SAVE');
  };

  const handleClickShowPrivKey = () =>
    setValues({ ...values, showPrivateKey: !values.showPrivateKey });

  const handleMouseDownPrivKey = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();

  return (
    <Layout title="Identity">
      {session ? (
        <>
          <Link href="/dashboard/1/identities">
            <a>
              <Typography variant="caption">← Back to Identities</Typography>
            </a>
          </Link>
          <br />
          <br />
          <Typography variant="h5">Create Identity</Typography>
          <Typography variant="caption" color="secondary">
            Private key is generated at the client; will not be sent to server.
          </Typography>
          <br />
          <br />
          <Button size="small" variant="contained">
            <a onClick={handleKeyGen}>
              {values.saveMode ? <>⌘ Re-generate It</> : <>⌘ Generate Keys</>}
            </a>
          </Button>{' '}
          <Button disabled={!values.did} size="small" variant="contained">
            <a onClick={handleSubmit}>⇲ Verify Did Document</a>
          </Button>
          <Divider />
          {!values.saveMode ? (
            values.did ? (
              <pre>
                {JSON.stringify(
                  pick(values, 'did', 'publicKey', 'privateKey', 'didDocument'),
                  null,
                  2
                )}
              </pre>
            ) : (
              <p>Click 👆 to generate key pair, and DID Document</p>
            )
          ) : (
            <div>
              <br />
              <FormControl className={classes.textField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Private Key</InputLabel>
                <OutlinedInput
                  readOnly
                  id="outlined-adornment-password"
                  type={values.showPrivateKey ? 'text' : 'password'}
                  value={values.privateKey}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPrivKey}
                        onMouseDown={handleMouseDownPrivKey}
                        edge="end">
                        {values.showPrivateKey ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={100}
                />
              </FormControl>
              <p>
                <Typography variant="caption" color="secondary">
                  👆 Make sure you copy and save it, before proceeding. It will NOT show it again.
                </Typography>
              </p>
              <br />
              <br />
              <Typography variant="h6">DID Document</Typography>
              <pre>{JSON.stringify(values.didDocument, null, 2)}</pre>
            </div>
          )}
          <Divider />
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
