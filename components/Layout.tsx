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
import React, { FC, Fragment, useEffect, MouseEvent, useState, useRef, KeyboardEvent } from 'react';
import { useStyles } from '../utils';

const Layout: FC<{ title?: string }> = ({ children, title = 'No Title' }) => {
  const [session, loading] = useSession();
  const classes = useStyles();

  // @see https://material-ui.com/components/menus/
  // POPUP MENU for TENANT
  const [openTenant, setOpenTenant] = useState(false);
  const anchorRefTenant = useRef<HTMLButtonElement>(null);
  const handleToggleTenant = () => setOpenTenant((prevOpen) => !prevOpen);
  const handleCloseTenant = ({ target }: MouseEvent<EventTarget>) =>
    !anchorRefTenant?.current?.contains(target as HTMLElement) && setOpenTenant(false);
  const handleListKeyDownTenant = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenTenant(false);
    }
  };
  const prevOpenTenant = useRef(openTenant);
  useEffect(() => {
    prevOpenTenant.current && !openTenant && anchorRefTenant.current?.focus();
    prevOpenTenant.current = openTenant;
  }, [openTenant]);
  // END OF TENTANT

  // POPUP MENU for ACCOUNT
  const [openAccount, setOpenAccount] = useState(false);
  const anchorRefAccount = useRef<HTMLButtonElement>(null);
  const handleToggleAccount = () => setOpenAccount((prevOpen) => !prevOpen);
  const handleCloseAccount = ({ target }: MouseEvent<EventTarget>) =>
    !anchorRefAccount?.current?.contains(target as HTMLElement) && setOpenAccount(false);
  const handleListKeyDownAccount = (event: KeyboardEvent) =>
    event.key === 'Tab' && event.preventDefault() && setOpenAccount(false);
  const prevOpenAccount = useRef(openAccount);
  useEffect(() => {
    prevOpenAccount.current && !openAccount && anchorRefAccount.current?.focus();
    prevOpenAccount.current = openAccount;
  }, [openAccount]);
  // END OF ACCOUNT

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
                {session && (
                  <>
                    {/*** POP MENU FOR TENANT ***/}
                    <Button
                      color="inherit"
                      ref={anchorRefTenant}
                      aria-controls={openTenant ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggleTenant}>
                      <a>My Tenant</a>
                    </Button>
                    <Popper
                      open={openTenant}
                      anchorEl={anchorRefTenant.current}
                      role={undefined}
                      transition
                      disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom' ? 'center top' : 'center bottom',
                          }}>
                          <Paper>
                            <ClickAwayListener onClickAway={handleCloseTenant}>
                              <MenuList
                                autoFocusItem={openTenant}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDownTenant}>
                                <MenuItem onClick={handleCloseTenant}>
                                  <span>Tenant 1</span>
                                </MenuItem>
                                <MenuItem onClick={handleCloseTenant}>
                                  <span>Settings</span>
                                </MenuItem>
                                <MenuItem onClick={handleCloseTenant}>
                                  <span>Invite a member</span>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleCloseTenant}>
                                  <span>Create tenant</span>
                                </MenuItem>
                                <MenuItem onClick={handleCloseTenant}>
                                  <span>Switch tenant</span>
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                    {/*** END OF POP MENU FOR TENANT ***/}
                  </>
                )}
              </div>
              {session ? (
                <>
                  {/*** POP MENU FOR ACCOUNT ***/}
                  {session && (
                    <span
                      style={{ backgroundImage: `url(${session.user.image})` }}
                      className={classes.avatar}
                    />
                  )}
                  <Button
                    color="inherit"
                    ref={anchorRefAccount}
                    aria-controls={openAccount ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggleAccount}>
                    {session?.user?.image ? (
                      <Avatar
                        alt={session?.user?.name || 'Anonymous'}
                        src={session?.user?.image}
                      />
                    ) : (
                      <Typography variant="caption">{session?.user?.name}</Typography>
                    )}
                  </Button>
                  <Popper
                    open={openAccount}
                    anchorEl={anchorRefAccount.current}
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
                          <ClickAwayListener onClickAway={handleCloseAccount}>
                            <MenuList
                              autoFocusItem={openAccount}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDownAccount}>
                              <MenuItem onClick={handleCloseAccount}>
                                <span>
                                  {session?.user?.name || 'Anonymous'}
                                  <br />
                                  <Typography variant="caption">{session?.user?.email}</Typography>
                                </span>
                              </MenuItem>
                              <MenuItem onClick={handleCloseAccount}>
                                <Link href="/profile">Account Settings</Link>
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={handleCloseAccount}>
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
                  {/*** END OF POP MENU FOR ACCOUNT ***/}
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
