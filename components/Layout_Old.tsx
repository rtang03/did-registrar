import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useStyles } from '../utils';

const Layout: React.FC<{
  title?: string;
  isLoading?: boolean;
  user?: any;
  error: any;
}> = ({ children, title = 'No Title', isLoading, user, error }) => {
  const classes = useStyles();

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
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              {' '}
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu">
                <ListAltIcon />
              </IconButton>
              <div className={classes.root}>
                {user ? (
                  <>
                    <Button color="inherit">
                      <Link href="/">
                        <a>Home</a>
                      </Link>
                    </Button>
                    <Button color="inherit">
                      <Link href="/profile">
                        <a>Profile</a>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button color="inherit">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </Button>
                )}
              </div>
              {user ? (
                <>
                  <Button color="inherit">
                    <Link href="/api/auth/logout">
                      <a>Log out</a>
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  {' '}
                  <Button color="inherit">
                    <Link href="/api/auth/login">
                      <a>Sign up</a>
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link href="/api/auth/login">
                      <a>Sign In</a>
                    </Link>
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </header>
      {isLoading ? <LinearProgress /> : <Divider />}
      <br />
      {error ? <div>{error.message}</div> : <>{children}</>}
    </div>
  );
};

export default Layout;
