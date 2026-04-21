import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useHistory, useParams } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { FormTextField } from '../../components/common/FormTextField';
import { LoadingFallback } from '../../components/common/LoadingFallback';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useCustomerView } from '../../hooks/useCustomerView';
import { useFeedback } from '../../hooks/useFeedback';
import { createCustomerRequest, getCustomerByIdRequest, updateCustomerRequest } from '../../services/customer/customerService';
import {
  createEmptyCustomerForm,
  mapCustomerDetailToForm,
  mapCustomerFormToCreatePayload,
  mapCustomerFormToUpdatePayload,
} from '../../services/customer/customerTransformers';
import { getInterestsRequest } from '../../services/interest/interestService';
import { readFileAsBase64, isSupportedImageFile } from '../../utils/file';
import { customerSchema, getValidationErrors } from '../../utils/validators';
import { getApiErrorMessage } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  panel: {
    padding: theme.spacing(3),
    borderRadius: theme.layout.surface.cardRadius,
    background: theme.layout.surface.cardBackground,
    border: `1px solid ${theme.layout.surface.cardBorder}`,
    boxShadow: theme.layout.surface.cardShadow,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  titleBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  profileUploadButton: {
    width: 72,
    height: 72,
    minWidth: 72,
    borderRadius: '50%',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.layout.surface.cardBorder}`,
    background: theme.layout.surface.cardBackground,
    boxShadow: theme.layout.surface.cardShadow,
    overflow: 'hidden',
    color: theme.palette.text.secondary,
  },
  profileUploadImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileUploadIcon: {
    fontSize: 42,
  },
  profileUploadMeta: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(0.5),
  },
  actionButtons: {
    display: 'flex',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
    },
  },
  actionButton: {
    minWidth: 0,
    height: 40,
    padding: theme.spacing(0.75, 1.75),
    borderRadius: 0,
    fontWeight: 700,
    boxShadow: 'none',
    border: 'none',
    backgroundColor: theme.layout.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f7f9fc',
    color: theme.layout.mode === 'dark' ? theme.palette.text.primary : '#4f6781',
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1),
      marginLeft: 0,
      color: theme.layout.mode === 'dark' ? theme.palette.primary.main : '#607d94',
    },
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: theme.layout.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#eef3f8',
    },
  },
  preview: {
    width: '100%',
    minHeight: 160,
    border: '1px solid rgba(148, 163, 184, 0.14)',
    borderRadius: 16,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: theme.layout.surface.cardBackground,
    boxShadow: theme.layout.surface.cardShadow,
  },
  previewTextareaFix: {
    '& .MuiOutlinedInput-root': {
      height: '100%',
      alignItems: 'stretch',
    },
    '& .MuiOutlinedInput-inputMultiline': {
      height: '100% !important',
      boxSizing: 'border-box',
    },
  },
}));

export function CustomerFormPage() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { userid } = useAuth();
  const { setListFilters } = useCustomerView();
  const { showFeedback } = useFeedback();
  const isEditMode = Boolean(id);
  const [values, setValues] = useState(createEmptyCustomerForm());
  const [errors, setErrors] = useState({});
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadPage = async () => {
      setLoading(true);

      try {
        const interestsResponse = await getInterestsRequest();

        if (!mounted) {
          return;
        }

        setInterests(interestsResponse);

        if (isEditMode) {
          const customerDetail = await getCustomerByIdRequest(id);

          if (!mounted) {
            return;
          }

          setValues(mapCustomerDetailToForm(customerDetail));
        }
      } catch (error) {
        showFeedback({ message: getApiErrorMessage(error, 'No se pudieron cargar las dependencias del formulario.'), severity: 'error' });
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPage();

    return () => {
      mounted = false;
    };
  }, [id, isEditMode, showFeedback]);

  const selectErrors = useMemo(
    () => ({
      sexo: errors.sexo,
      interesId: errors.interesId,
    }),
    [errors]
  );

  const selectMenuProps = useMemo(
    () => ({
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      variant: 'menu',
    }),
    []
  );

  const handleChange = (field) => (event) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  };

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!isSupportedImageFile(selectedFile)) {
      setErrors((current) => ({
        ...current,
        imagen: 'Selecciona un archivo de imagen valido.',
      }));
      return;
    }

    try {
      const base64Value = await readFileAsBase64(selectedFile);
      setValues((current) => ({
        ...current,
        imagen: base64Value,
      }));
      setErrors((current) => ({
        ...current,
        imagen: '',
      }));
    } catch (error) {
      setErrors((current) => ({
        ...current,
        imagen: error.message,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = getValidationErrors(customerSchema, values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    try {
      if (isEditMode) {
        await updateCustomerRequest(mapCustomerFormToUpdatePayload(values, userid));
        showFeedback({ message: 'Cliente actualizado correctamente.', severity: 'success' });
      } else {
        await createCustomerRequest(mapCustomerFormToCreatePayload(values, userid));
        setListFilters({ nombre: '', identificacion: '' });
        showFeedback({ message: 'Cliente creado correctamente.', severity: 'success' });
      }

      history.push(ROUTES.customers);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, 'No se pudo guardar el cliente. Intenta nuevamente.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <LoadingFallback label="Cargando formulario de clientes" />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Paper className={classes.panel} elevation={0}>
        <Box className={classes.header}>
          <Box className={classes.titleBlock}>
            <Box className={classes.profileUploadMeta}>
              <Button component="label" variant="outlined" className={classes.profileUploadButton}>
                {values.imagen ? (
                  <img src={values.imagen} alt="Vista previa del cliente" className={classes.profileUploadImage} />
                ) : (
                  <AccountCircleOutlinedIcon className={classes.profileUploadIcon} />
                )}
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>
            </Box>
            <Box>
              <Typography variant="h5">Mantenimiento de clientes</Typography>
              {errors.imagen ? <Typography variant="caption" color="error">{errors.imagen}</Typography> : null}
            </Box>
          </Box>

          <Box className={classes.actionButtons}>
            <Button
              variant="outlined"
              startIcon={<SaveOutlinedIcon />}
              onClick={handleSubmit}
              disabled={saving}
              className={classes.actionButton}
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBackOutlinedIcon />}
              onClick={() => history.push(ROUTES.customers)}
              disabled={saving}
              className={classes.actionButton}
            >
              Regresar
            </Button>
          </Box>
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormTextField label="Identificacion *" value={values.identificacion} onChange={handleChange('identificacion')} error={errors.identificacion} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormTextField label="Nombre *" value={values.nombre} onChange={handleChange('nombre')} error={errors.nombre} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormTextField label="Apellidos *" value={values.apellidos} onChange={handleChange('apellidos')} error={errors.apellidos} />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormTextField
                select
                label="Genero *"
                value={values.sexo}
                onChange={handleChange('sexo')}
                error={selectErrors.sexo}
                SelectProps={{
                  displayEmpty: true,
                  MenuProps: selectMenuProps,
                  IconComponent: KeyboardArrowDownRoundedIcon,
                }}
              >
                <MenuItem value="">Seleccione</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
                <MenuItem value="M">Masculino</MenuItem>
              </FormTextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormTextField
                label="Fecha de nacimiento *"
                type="date"
                value={values.fNacimiento}
                onChange={handleChange('fNacimiento')}
                error={errors.fNacimiento}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormTextField
                label="Fecha de afiliacion *"
                type="date"
                value={values.fAfiliacion}
                onChange={handleChange('fAfiliacion')}
                error={errors.fAfiliacion}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormTextField
                label="Telefono celular *"
                value={values.telefonoCelular}
                onChange={handleChange('telefonoCelular')}
                error={errors.telefonoCelular}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormTextField label="Telefono alterno *" value={values.otroTelefono} onChange={handleChange('otroTelefono')} error={errors.otroTelefono} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormTextField
                select
                label="Interes *"
                value={values.interesId}
                onChange={handleChange('interesId')}
                error={selectErrors.interesId}
                SelectProps={{
                  displayEmpty: true,
                  MenuProps: selectMenuProps,
                  IconComponent: KeyboardArrowDownRoundedIcon,
                }}
              >
                <MenuItem value="">Seleccione</MenuItem>
                {interests.map((interest) => (
                  <MenuItem key={interest.id} value={interest.id}>
                    {interest.descripcion}
                  </MenuItem>
                ))}
              </FormTextField>
            </Grid>

            <Grid item xs={12}>
              <Box className={classes.preview}>
                <FormTextField
                  label="Direccion *"
                  value={values.direccion}
                  onChange={handleChange('direccion')}
                  error={errors.direccion}
                  multiline
                  rows={4}
                  className={classes.previewTextareaFix}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.preview}>
                <FormTextField
                  label="Resena personal *"
                  value={values.resenaPersonal}
                  onChange={handleChange('resenaPersonal')}
                  error={errors.resenaPersonal}
                  multiline
                  rows={4}
                  className={classes.previewTextareaFix}
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <ConfirmationDialog
        open={Boolean(submitError)}
        title="Error al guardar cliente"
        description={submitError}
        loading={false}
        onClose={() => setSubmitError('')}
        onConfirm={() => setSubmitError('')}
        confirmLabel="Cerrar"
        confirmColor="primary"
        hideCancel
      />
    </AppShell>
  );
}
