import React from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { AppShell } from '../../components/layout/AppShell';
import { AuthLayout } from '../../components/layout/AuthLayout';

const useStyles = makeStyles((theme) => ({
  panel: {
    padding: theme.spacing(6, 3),
    borderRadius: theme.layout.surface.cardRadius,
    textAlign: 'center',
    background: theme.layout.surface.cardBackground,
    border: `1px solid ${theme.layout.surface.cardBorder}`,
    boxShadow: theme.layout.surface.cardShadow,
  },
  icon: {
    fontSize: 88,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  actionButton: {
    minWidth: 0,
    height: 40,
    padding: theme.spacing(0.75, 1.75),
    borderRadius: 0,
    fontWeight: 700,
    boxShadow: 'none',
  },
}));

function NotFoundContent() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.panel} elevation={0}>
      <ReportProblemOutlinedIcon className={classes.icon} />
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Pagina no encontrada
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        La ruta solicitada no existe dentro del flujo de navegacion actual de la SPA.
      </Typography>
      <Box marginTop={3}>
        <Button variant="contained" color="primary" onClick={() => history.push(ROUTES.home)} className={classes.actionButton}>
          Volver al inicio
        </Button>
      </Box>
    </Paper>
  );
}

export function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <AppShell title="404" subtitle="Ruta desconocida">
        <NotFoundContent />
      </AppShell>
    );
  }

  return (
    <AuthLayout title="404" subtitle="Ruta desconocida">
      <NotFoundContent />
    </AuthLayout>
  );
}
