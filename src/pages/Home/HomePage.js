import React from 'react';
import {
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { useHistory } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { ROUTES } from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'grid',
    gap: theme.spacing(3),
  },
  panel: {
    padding: theme.spacing(3.5),
    borderRadius: theme.layout.surface.cardRadius,
    background: theme.layout.surface.cardBackground,
    border: `1px solid ${theme.layout.surface.cardBorder}`,
    boxShadow: theme.layout.surface.cardShadow,
  },
  welcomePanel: {
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(4),
    background: theme.layout.surface.heroBackground,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  welcomeGlow: {
    position: 'absolute',
    top: -90,
    right: -70,
    width: 240,
    height: 240,
    borderRadius: '50%',
    background: theme.layout.mode === 'dark'
      ? 'radial-gradient(circle, rgba(126, 166, 255, 0.16), rgba(126, 166, 255, 0))'
      : 'radial-gradient(circle, rgba(32, 74, 120, 0.10), rgba(32, 74, 120, 0))',
    pointerEvents: 'none',
  },
  welcomeHeader: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(126, 166, 255, 0.12)' : 'rgba(32, 74, 120, 0.08)',
  },
  welcomeTitle: {
    fontSize: '3.1rem',
    fontWeight: 800,
    letterSpacing: '-0.05em',
    lineHeight: 1,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.35rem',
    },
  },
  welcomeDescription: {
    maxWidth: 620,
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    lineHeight: 1.75,
  },
  actionRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(3),
  },
  statusCard: {
    alignSelf: 'flex-start',
    padding: theme.spacing(2.5),
    borderRadius: 22,
    border: `1px solid ${theme.layout.surface.heroBorder}`,
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(24, 31, 41, 0.96)' : '#ffffff',
    boxShadow: theme.layout.mode === 'dark'
      ? '0 20px 36px rgba(0, 0, 0, 0.22)'
      : '0 18px 36px rgba(15, 23, 42, 0.10)',
  },
  eyebrow: {
    marginBottom: theme.spacing(0.75),
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
  },
  compactValue: {
    fontSize: '2rem',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    color: theme.palette.text.primary,
  },
  mutedText: {
    color: theme.palette.text.secondary,
  },
}));

export function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppShell>
      <Box className={classes.page}>
        <Box className={`${classes.panel} ${classes.welcomePanel}`}>
          <Box className={classes.welcomeGlow} />
          <Box className={classes.welcomeHeader}>
            <Box>
              <Box className={classes.welcomeIcon}>
                <DashboardOutlinedIcon fontSize="large" />
              </Box>
              <Typography className={classes.welcomeTitle}>Bienvenido</Typography>
              <Box className={classes.actionRow}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardOutlinedIcon />}
                  onClick={() => history.push(ROUTES.customers)}
                >
                  Consulta clientes
                </Button>
              </Box>
            </Box>

            <Box className={classes.statusCard}>
              <Typography className={classes.eyebrow}>Gestion de clientes</Typography>
              <Typography className={classes.compactValue}>Sistema activo</Typography>
              <Typography variant="body2" className={classes.mutedText}>
                Administra registros, consultas y actualizaciones de clientes desde un solo lugar.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}
