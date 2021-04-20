import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';
import React, { FC, Fragment } from 'react';
import { useStyles } from '../utils';

const Layout: FC<{ title?: string }> = ({ children, title = 'No Title' }) => {
  const [session, loading] = useSession();
  const classes = useStyles();

  // Popup menu @see https://material-ui.com/components/menus/
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = ({ target }: React.MouseEvent<EventTarget>) =>
    !anchorRef?.current?.contains(target as HTMLElement) && setOpen(false);
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    prevOpen.current && !open && anchorRef.current?.focus();
    prevOpen.current = open;
  }, [open]);
  // end of menu

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
              <div className={classes.root}>
                <Button color="inherit">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </Button>
                {session ? (
                  <>
                    <Button color="inherit">
                      <Link href="/profile">
                        <a>Profiile</a>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Fragment />
                )}
              </div>
              {session ? (
                <>
                  {session?.user?.image && (
                    <span
                      style={{ backgroundImage: `url(${session.user.image})` }}
                      className={classes.avatar}
                    />
                  )}
                  <Button
                    color="inherit"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}>
                    {session?.user?.image ? (
                      <Avatar
                        alt={session?.user?.name || 'Anonymous'}
                        src="{session?.user?.image}"
                      />
                    ) : (
                      <Typography variant="caption">{session?.user?.name}</Typography>
                    )}
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}>
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}>
                              <MenuItem onClick={handleClose}>
                                <span>
                                  {session?.user?.name || 'Anonymous'}
                                  <br />
                                  <Typography variant="caption">{session?.user?.email}</Typography>
                                </span>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                              <Divider />
                              <MenuItem onClick={handleClose}>
                                <a
                                  href={`/api/auth/signout`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    return signOut();
                                  }}>
                                  Sign Out
                                </a>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              ) : (
                <>
                  <Button color="inherit">
                    <a
                      href={`/api/auth/signin`}
                      onClick={(e) => {
                        e.preventDefault();
                        return signIn();
                      }}>
                      Sign In
                    </a>
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </header>
      {loading ? <LinearProgress /> : <Divider />}
      <br />
      {children}
    </div>
  );
};

export default Layout;
