import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grow from '@material-ui/core/Grow';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';
import React, { FC, useEffect, MouseEvent, useState, useRef, KeyboardEvent } from 'react';
import { useStyles } from '../utils';
import { sideBar } from './sidebar';

const Layout: FC<{ title?: string }> = ({ children, title = 'No Title' }) => {
  const [session, loading] = useSession();
  const classes = useStyles();

  // @see https://material-ui.com/components/drawers/

  // @see https://material-ui.com/components/menus/
  // POPUP MENU for TENANT
  const [openTenant, setOpenTenant] = useState(false);
  const anchorRefTenant = useRef<HTMLButtonElement>(null);
  const handleToggleTenant = () => setOpenTenant((prevOpen) => !prevOpen);
  const handleCloseTenant = ({ target }: MouseEvent<EventTarget>) =>
    !anchorRefTenant?.current?.contains(target as HTMLElement) && setOpenTenant(false);
  const handleListKeyDownTenant = (event: KeyboardEvent) =>
    event.key === 'Tab' && event.preventDefault() && setOpenTenant(false);
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
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
      </Head>
      <style jsx global>{`
        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button color="inherit">
            <Link href="/">
              <Typography variant="caption" noWrap>
                Home
              </Typography>
            </Link>
          </Button>

          <div className={classes.root} />
          {session ? (
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
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
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
              {/*** POP MENU FOR ACCOUNT ***/}
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={classes.avatar}
              />
              <Button
                color="inherit"
                ref={anchorRefAccount}
                aria-controls={openAccount ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggleAccount}>
                {session?.user?.image ? (
                  <Avatar alt={session?.user?.name || 'Anonymous'} src={session?.user?.image} />
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
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left">
        <Divider />
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {sideBar.map(({ text, icon, link }, index) => (
            <Link href={link} key={text}>
              <ListItem button>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText secondary={text} />
              </ListItem>
            </Link>
          ))}
          <Divider />
        </List>
      </Drawer>
      {loading ? <LinearProgress /> : <Divider />}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
