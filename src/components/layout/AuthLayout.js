import React from 'react';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(4),
    backgroundColor: theme.layout.page.background,
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(6),
    },
  },
  panel: {
    background: theme.layout.surface.authPanelBackground,
    border: 'none',
    boxShadow: 'none',
    padding: theme.spacing(1.5, 4.5, 4),
    borderRadius: 0,
    maxWidth: 540,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 2.5, 3),
    },
  },
  brand: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(0.5),
    display: 'none',
  },
  iconWrap: {
    width: 72,
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(0, 'auto', 2.5),
    borderRadius: '50%',
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(126, 166, 255, 0.14)' : 'rgba(32, 74, 120, 0.10)',
    color: theme.palette.primary.main,
  },
  icon: {
    fontSize: '2rem',
  },
  subtitle: {
    display: 'none',
  },
  title: {
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: theme.spacing(3.5),
    color: '#2e4668',
    fontSize: '1.95rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.75rem',
    },
  },
}));

export function AuthLayout({ title, subtitle, icon, children }) {
  const classes = useStyles();
  const IconComponent = icon || LockOutlinedIcon;

  return (
    <Box className={classes.page}>
      <Container maxWidth="xs">
        <Paper className={classes.panel} elevation={0}>
          <Typography variant="overline" className={classes.brand}>
              COMPANIA PRUEBA
          </Typography>
          <Box className={classes.iconWrap}>
            <IconComponent className={classes.icon} />
          </Box>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
            {subtitle}
          </Typography>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
