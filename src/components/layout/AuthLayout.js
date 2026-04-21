import React from 'react';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export function AuthLayout({ title, subtitle, children }) {
  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <Container maxWidth="xs">
        <Paper className={classes.panel} elevation={0}>
          <Typography variant="overline" className={classes.brand}>
            Compania de Prueba
          </Typography>
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
