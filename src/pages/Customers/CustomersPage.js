import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { useHistory } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { FormTextField } from '../../components/common/FormTextField';
import { CustomerListTable } from '../../components/customer/CustomerListTable';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { LoadingFallback } from '../../components/common/LoadingFallback';
import { MessageDialog } from '../../components/common/MessageDialog';
import { createSecondaryActionButtonStyle, createSurfacePanelStyle } from '../../components/layout/sharedPageStyles';
import { ROUTES, getCustomerEditRoute } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useCustomerView } from '../../hooks/useCustomerView';
import { deleteCustomerRequest, getCustomersRequest } from '../../services/customer/customerService';
import { getApiErrorMessage } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  panel: createSurfacePanelStyle(theme),
  panelTitle: {
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'stretch',
      flexDirection: 'column',
    },
  },
  actionButton: createSecondaryActionButtonStyle(theme),
  searchButtonWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    minHeight: 88,
  },
  searchButton: {
    width: 46,
    height: 46,
    minWidth: 46,
    borderRadius: '50%',
    padding: 0,
    boxShadow: 'none',
    border: `1px solid ${theme.layout.surface.cardBorder}`,
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f7f9fc',
    color: theme.layout.mode === 'dark' ? theme.palette.primary.main : '#607d94',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: theme.layout.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#eef3f8',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
}));

export function CustomersPage() {
  const classes = useStyles();
  const history = useHistory();
  const { userid } = useAuth();
  const { listFilters, setListFilters, resetListFilters } = useCustomerView();
  const [initialFilters] = useState(() => listFilters);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteState, setDeleteState] = useState({
    open: false,
    customer: null,
    loading: false,
  });
  const [messageDialog, setMessageDialog] = useState({
    open: false,
    title: '',
    message: '',
    severity: 'success',
  });

  const loadCustomers = useCallback(async (filters = {}) => {
    setLoading(true);

    try {
      const payload = {
        usuarioId: userid,
      };

      if (filters.nombre?.trim()) {
        payload.nombre = filters.nombre.trim();
      }

      if (filters.identificacion?.trim()) {
        payload.identificacion = filters.identificacion.trim();
      }

      const response = await getCustomersRequest(payload);
      setCustomers(response);
    } catch (error) {
      setMessageDialog({
        open: true,
        title: 'No fue posible cargar los clientes',
        message: getApiErrorMessage(error, 'No se pudieron cargar los clientes.'),
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [userid]);

  useEffect(() => {
    loadCustomers(initialFilters);
  }, [initialFilters, loadCustomers]);

  const handleFilterChange = (field) => (event) => {
    setListFilters((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSearch = () => {
    loadCustomers(listFilters);
  };

  const handleBack = () => {
    resetListFilters();
    history.push(ROUTES.home);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteState.customer) {
      return;
    }

    setDeleteState((current) => ({
      ...current,
      loading: true,
    }));

    try {
      await deleteCustomerRequest(deleteState.customer.id);
      setDeleteState({ open: false, customer: null, loading: false });
      setMessageDialog({
        open: true,
        title: 'Cliente eliminado',
        message: 'El cliente fue eliminado correctamente.',
        severity: 'success',
      });
      await loadCustomers(listFilters);
    } catch (error) {
      setDeleteState({ open: false, customer: null, loading: false });
      setMessageDialog({
        open: true,
        title: 'No pudimos eliminar el cliente',
        message: getApiErrorMessage(error, 'No pudimos eliminar el cliente en este momento. Por favor intenta nuevamente.'),
        severity: 'error',
      });
    }
  };

  return (
    <AppShell>
      <Paper className={classes.panel} elevation={0}>
        <Box className={classes.panelHeader}>
          <Typography variant="h5" className={classes.panelTitle}>
            Consulta de clientes
          </Typography>

          <Box className={classes.actions}>
            <Button
              variant="outlined"
              startIcon={<AddOutlinedIcon />}
              onClick={() => history.push(ROUTES.customerCreate)}
              className={classes.actionButton}
            >
              Agregar
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBackOutlinedIcon />}
              onClick={handleBack}
              className={classes.actionButton}
            >
              Regresar
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <FormTextField label="Nombre" value={listFilters.nombre} onChange={handleFilterChange('nombre')} />
          </Grid>
          <Grid item xs={12} md={5}>
            <FormTextField label="Identificacion" value={listFilters.identificacion} onChange={handleFilterChange('identificacion')} />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box className={classes.searchButtonWrap}>
              <Button
                variant="outlined"
                onClick={handleSearch}
                className={classes.searchButton}
                aria-label="Buscar"
              >
                <SearchOutlinedIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box marginTop={2}>
          {loading ? (
            <LoadingFallback label="Cargando clientes" />
          ) : (
            <CustomerListTable
              rows={customers}
              onEdit={(customer) => history.push(getCustomerEditRoute(customer.id))}
              onDelete={(customer) => setDeleteState({ open: true, customer, loading: false })}
            />
          )}
        </Box>
      </Paper>

      <ConfirmationDialog
        open={deleteState.open}
        title="Eliminar cliente"
        description="Estas seguro de que deseas eliminar el cliente seleccionado? Esta accion llamara inmediatamente al endpoint de eliminacion."
        loading={deleteState.loading}
        onClose={() => setDeleteState({ open: false, customer: null, loading: false })}
        onConfirm={handleDeleteConfirm}
      />

      <MessageDialog
        open={messageDialog.open}
        title={messageDialog.title}
        message={messageDialog.message}
        severity={messageDialog.severity}
        onClose={() => setMessageDialog((current) => ({ ...current, open: false }))}
      />
    </AppShell>
  );
}
