import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useHistory } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { FormTextField } from '../../components/common/FormTextField';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/useFeedback';
import { getValidationErrors, loginSchema } from '../../utils/validators';

const useStyles = makeStyles((theme) => ({
  submitButton: {
    height: 52,
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
  },
  rememberBox: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
  },
  checkboxRow: {
    marginLeft: 0,
    '& .MuiTypography-root': {
      color: '#2e4668',
      fontSize: '0.95rem',
    },
    '& .MuiCheckbox-root': {
      color: '#6d7782',
      paddingLeft: 0,
      paddingRight: theme.spacing(1),
    },
  },
  authLink: {
    color: '#2d98f0',
    display: 'inline-block',
    maxWidth: 220,
    textAlign: 'left',
    lineHeight: 1.15,
    fontSize: '0.95rem',
    marginTop: theme.spacing(0.5),
  },
  eyeButton: {
    color: '#566979',
    padding: 8,
  },
}));

export function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const { login, getRememberedUsername } = useAuth();
  const { showFeedback } = useFeedback();
  const rememberedUsername = useMemo(() => getRememberedUsername(), [getRememberedUsername]);
  const [values, setValues] = useState({
    username: rememberedUsername,
    password: '',
    rememberMe: Boolean(rememberedUsername),
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleChange = (field) => (event) => {
    const nextValue = field === 'rememberMe' ? event.target.checked : event.target.value;
    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));
    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = getValidationErrors(loginSchema, values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await login(values);
      if (!isMountedRef.current) {
        return;
      }
      showFeedback({ message: 'Inicio de sesion completado correctamente.', severity: 'success' });
      history.push(ROUTES.home);
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }
      showFeedback({ message: error.message, severity: 'error' });
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <AuthLayout title="Iniciar sesión" subtitle="Usa tu cuenta registrada para acceder al panel de gestion de clientes.">
      <form onSubmit={handleSubmit} noValidate>
        <FormTextField
          label="Usuario *"
          name="username"
          value={values.username}
          onChange={handleChange('username')}
          error={errors.username}
        />

        <FormTextField
          label="Contrasena *"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          error={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword((current) => !current)} className={classes.eyeButton}>
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box className={classes.rememberBox}>
          <FormControlLabel
            className={classes.checkboxRow}
            control={<Checkbox color="primary" checked={values.rememberMe} onChange={handleChange('rememberMe')} />}
            label="Recordarme"
          />
        </Box>

        <Box marginTop={2}>
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading} className={classes.submitButton}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </Box>

        <Box marginTop={3}>
          <Link component="button" variant="body1" onClick={() => history.push(ROUTES.register)} className={classes.authLink}>
            No tienes una cuenta?
            <br />
            Registrate
          </Link>
        </Box>
      </form>
    </AuthLayout>
  );
}
