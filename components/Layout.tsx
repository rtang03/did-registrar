import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useStyles } from '../utils';

const Layout: React.FC<{
  title?: string;
  isLoading?: boolean;
  user?: any;
}> = ({ children, title = 'No Title', isLoading, user }) => {
  const classes = useStyles();

  if (user) {
    console.log(user);
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
            Arial, Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
            'Noto Color Emoji';
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .container {
          max-width: 65rem;
          margin: 1.5rem auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
      <header>
        <div className={classes.root}>Home</div>
      </header>
      {isLoading ? <LinearProgress /> : <Divider />}
      <br />
      {children}
    </div>
  );
};

export default Layout;
