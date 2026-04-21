import React, { useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import SettingsBrightnessOutlinedIcon from '@material-ui/icons/SettingsBrightnessOutlined';
import { NavLink, useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useThemeMode } from '../../hooks/useThemeMode';

const DRAWER_WIDTH = 288;
const COLLAPSED_DRAWER_WIDTH = 108;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    overflowX: 'hidden',
  },
  appBar: {
    width: '100%',
    marginLeft: 0,
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(1.5),
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.layout.appBar.selectorBackground,
    },
  },
  toolbar: {
    minHeight: 48,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  brand: {
    fontWeight: 700,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    color: theme.layout.appBar.text,
  },
  topBrand: {
    display: 'flex',
    alignItems: 'center',
  },
  drawerPaper: {
    padding: 0,
    overflowX: 'hidden',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  drawerRail: {
    flexShrink: 0,
    paddingTop: 52,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  drawerContent: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    borderRadius: 0,
    overflow: 'hidden',
    background: theme.layout.drawer.background,
    border: `1px solid ${theme.layout.drawer.border}`,
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(4, 2.5),
    color: theme.layout.drawer.text,
    backgroundColor: theme.layout.drawer.profileBackground,
    borderBottom: `1px solid ${theme.layout.drawer.border}`,
  },
  profileAvatar: {
    width: 108,
    height: 108,
    fontSize: '2.75rem',
    backgroundColor: theme.layout.drawer.avatarBackground,
    color: theme.layout.drawer.text,
  },
  profileText: {
    textAlign: 'center',
  },
  navList: {
    display: 'grid',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5, 2),
    justifyItems: 'center',
  },
  navItem: {
    borderRadius: 999,
    color: theme.layout.drawer.mutedText,
    width: '100%',
    maxWidth: 220,
    margin: theme.spacing(0, 'auto'),
    padding: theme.spacing(1.5, 2.5),
    border: '1px solid transparent',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      backgroundColor: theme.layout.drawer.hoverBackground,
      transform: 'translateX(2px)',
    },
    '&.active': {
      backgroundColor: theme.layout.drawer.activeBackground,
      color: theme.layout.drawer.text,
      borderColor: theme.layout.drawer.activeBorder,
      boxShadow: theme.layout.drawer.activeShadow,
    },
  },
  navItemIcon: {
    minWidth: 40,
    color: 'inherit',
  },
  navItemText: {
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },
  navInitial: {
    minWidth: 28,
    fontWeight: 700,
    color: theme.layout.drawer.accent,
    fontSize: '0.95rem',
    letterSpacing: '0.04em',
  },
  menuSection: {
    padding: theme.spacing(2.25, 3),
    textAlign: 'center',
    borderTop: `1px solid ${theme.layout.drawer.border}`,
    borderBottom: `1px solid ${theme.layout.drawer.border}`,
    backgroundColor: theme.layout.drawer.sectionBackground,
  },
  menuSectionTitle: {
    fontWeight: 800,
    letterSpacing: '0.04em',
    color: theme.layout.drawer.text,
    fontSize: '0.95rem',
  },
  collapsedContent: {
    alignItems: 'stretch',
  },
  collapsedProfileCard: {
    justifyContent: 'center',
    padding: theme.spacing(0.25, 0, 1.75),
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(0.5),
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
  },
  collapsedAvatar: {
    width: 60,
    height: 60,
    fontSize: '1.75rem',
  },
  collapsedNavItem: {
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: 0,
    padding: theme.spacing(0.5, 0),
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: 'transparent',
    transform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'none',
    },
    '&.active': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      boxShadow: 'none',
    },
  },
  collapsedNavItemIcon: {
    minWidth: 0,
    marginRight: 0,
  },
  collapsedIconSurface: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.layout.drawer.mutedText,
    border: '1px solid transparent',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
  },
  collapsedNavList: {
    width: '100%',
    justifyItems: 'center',
    gap: theme.spacing(1.25),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingTop: theme.spacing(1.75),
    borderTop: `1px solid ${theme.layout.drawer.border}`,
  },
  collapsedActiveIconSurface: {
    color: theme.layout.drawer.text,
    backgroundColor: theme.layout.drawer.activeBackground,
    borderColor: theme.layout.drawer.activeBorder,
    boxShadow: theme.layout.drawer.activeShadow,
    '$collapsedNavItem.active &': {
      color: theme.layout.drawer.text,
      backgroundColor: theme.layout.drawer.activeBackground,
      borderColor: theme.layout.drawer.activeBorder,
      boxShadow: theme.layout.drawer.activeShadow,
    },
  },
  collapsedHoverIconSurface: {
    '$collapsedNavItem:hover &': {
      backgroundColor: theme.layout.drawer.hoverBackground,
      color: theme.layout.drawer.text,
    },
  },
  collapsedRailSurface: {
    background: theme.layout.drawer.background,
    border: `1px solid ${theme.layout.drawer.border}`,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    paddingTop: 76,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    transition: theme.transitions.create(['width', 'padding'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: 72,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    backgroundColor: theme.layout.page.background,
  },
  pageContainer: {
    width: '100%',
    minHeight: 'calc(100vh - 136px)',
  },
  topUser: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
  topUsername: {
    color: theme.layout.appBar.text,
    fontWeight: 700,
    fontSize: '0.95rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  toolbarTools: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    marginLeft: 'auto',
    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(1),
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
  },
  themeButtons: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    borderRadius: 999,
    border: `1px solid ${theme.layout.appBar.selectorBorder}`,
    backgroundColor: theme.layout.appBar.selectorBackground,
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0.5),
    },
  },
  themeButton: {
    minWidth: 0,
    borderRadius: 999,
    width: 42,
    height: 34,
    padding: 0,
    color: theme.layout.appBar.selectorText,
    fontWeight: 700,
    lineHeight: 1,
    [theme.breakpoints.down('xs')]: {
      width: 38,
      height: 32,
    },
    '&:hover': {
      backgroundColor: theme.layout.appBar.selectorBackground,
    },
  },
  activeThemeButton: {
    backgroundColor: theme.layout.appBar.selectorActiveBackground,
    color: theme.layout.appBar.selectorActiveText,
    '&:hover': {
      backgroundColor: theme.layout.appBar.selectorActiveBackground,
    },
  },
  themeButtonIcon: {
    marginRight: 0,
  },
  toolbarLogout: {
    color: theme.layout.appBar.logoutText,
    backgroundColor: theme.layout.appBar.logoutBackground,
    border: 'none',
    width: 34,
    height: 34,
    '&:hover': {
      backgroundColor: theme.layout.appBar.selectorBackground,
    },
  },
}));

function ShellDrawer({ collapsed, username, onNavigate }) {
  const classes = useStyles();
  const navItems = useMemo(
    () => [
      { label: 'INICIO', to: ROUTES.home, icon: <HomeOutlinedIcon />, shortLabel: 'IN' },
      { label: 'Consulta Clientes', to: ROUTES.customers, icon: <GroupOutlinedIcon />, shortLabel: 'CC' },
    ],
    []
  );

  return (
    <Box
      className={`${classes.drawerContent} ${collapsed ? `${classes.collapsedContent} ${classes.collapsedRailSurface}` : ''}`}
    >
      <Box className={`${classes.profileCard} ${collapsed ? classes.collapsedProfileCard : ''}`}>
        <Avatar className={`${classes.profileAvatar} ${collapsed ? classes.collapsedAvatar : ''}`}>
          {username?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>
        {!collapsed ? (
          <Box className={classes.profileText}>
            <Typography variant="h6" style={{ color: 'inherit', fontWeight: 700 }}>
              {username}
            </Typography>
          </Box>
        ) : null}
      </Box>

      {!collapsed ? (
        <Box className={classes.menuSection}>
          <Typography variant="h5" className={classes.menuSectionTitle}>
            MENU
          </Typography>
        </Box>
      ) : null}

      <List className={`${classes.navList} ${collapsed ? classes.collapsedNavList : ''}`} disablePadding>
        {navItems.map((item) => (
          <Tooltip key={item.to} title={collapsed ? item.label : ''} placement="right">
            <ListItem
              button
              component={NavLink}
              exact={item.to === ROUTES.home}
              to={item.to}
              className={`${classes.navItem} ${collapsed ? classes.collapsedNavItem : ''}`}
              activeClassName="active"
              onClick={onNavigate}
            >
              {collapsed ? (
                <Box className={`${classes.collapsedIconSurface} ${classes.collapsedHoverIconSurface} ${classes.collapsedActiveIconSurface}`}>
                  <ListItemIcon className={`${classes.navItemIcon} ${classes.collapsedNavItemIcon}`}>
                    {item.icon}
                  </ListItemIcon>
                </Box>
              ) : (
                <>
                  <Box className={classes.navInitial}>{item.shortLabel}</Box>
                  <ListItemText primary={item.label} className={classes.navItemText} />
                </>
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>

    </Box>
  );
}

export function AppShell({ title, subtitle, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const username = user?.username || 'Nombre de Usuario';
  const drawerWidth = isMobile ? DRAWER_WIDTH : collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH;

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleCloseDrawer = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    history.push(ROUTES.login);
  };

  const handleToggleCollapse = () => {
    setCollapsed((current) => !current);
  };

  const handlePrimaryMenuAction = () => {
    if (isMobile) {
      handleDrawerToggle();
      return;
    }

    handleToggleCollapse();
  };

  const drawer = (
    <ShellDrawer
      collapsed={collapsed}
      username={username}
      onNavigate={handleCloseDrawer}
    />
  );

  const themeOptions = [
    { value: 'light', label: 'Claro', icon: <Brightness5OutlinedIcon fontSize="small" className={classes.themeButtonIcon} /> },
    { value: 'dark', label: 'Oscuro', icon: <Brightness4OutlinedIcon fontSize="small" className={classes.themeButtonIcon} /> },
    { value: 'system', label: 'Sistema', icon: <SettingsBrightnessOutlinedIcon fontSize="small" className={classes.themeButtonIcon} /> },
  ];

  return (
    <Box className={classes.root}>
      <AppBar
        position="fixed"
        color="primary"
        className={classes.appBar}
        style={{
          backgroundColor: theme.layout.appBar.background,
          borderBottom: `4px solid ${theme.layout.appBar.border}`,
        }}
      >
        <Toolbar className={classes.toolbar}>
          <Box className={classes.topBrand}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handlePrimaryMenuAction}
              className={classes.menuButton}
              style={{ color: theme.layout.appBar.text }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="subtitle1" className={classes.brand}>
              COMPANIA PRUEBA
            </Typography>
          </Box>

          <Box className={classes.toolbarTools}>
            <Box className={classes.themeButtons} aria-label="selector de tema" role="group">
              {themeOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  size="small"
                  className={`${classes.themeButton} ${themeMode === option.value ? classes.activeThemeButton : ''}`}
                  onClick={() => setThemeMode(option.value)}
                  aria-label={option.label}
                  title={option.label}
                >
                  {option.icon}
                </Button>
              ))}
            </Box>

            <Box className={classes.topUser}>
              <Typography variant="subtitle1" className={classes.topUsername}>
                {username}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout} aria-label="cerrar sesion" className={classes.toolbarLogout}>
                <ExitToAppOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Hidden smDown implementation="css">
        <Box className={classes.drawerRail} style={{ width: drawerWidth }}>
          <Drawer
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            PaperProps={{ style: { width: drawerWidth, top: 52, height: 'calc(100% - 52px)' } }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </Hidden>

      <main className={classes.content} style={isMobile ? { width: '100%' } : { width: `calc(100% - ${drawerWidth}px)` }}>
        <Box className={classes.pageContainer}>
          {title || subtitle ? (
            <Box marginBottom={3}>
              {title ? (
                <Typography variant="h4" gutterBottom>
                  {title}
                </Typography>
              ) : null}
              {subtitle ? (
                <Typography variant="body2" color="textSecondary">
                  {subtitle}
                </Typography>
              ) : null}
            </Box>
          ) : null}
          {children}
        </Box>
      </main>
    </Box>
  );
}
