import React, { useState } from 'react';
import { Box, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { FormTextField } from '../../components/common/FormTextField';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/useFeedback';
import { getValidationErrors, registerSchema } from '../../utils/validators';

const useStyles = makeStyles(() => ({
  submitButton: {
    height: 52,
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
  },
  submitBox: {
    marginTop: 20,
  },
  loginLink: {
    color: '#2d98f0',
    display: 'inline-block',
    marginTop: 24,
    fontSize: '0.95rem',
    textAlign: 'left',
  },
}));

export function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const { register } = useAuth();
  const { showFeedback } = useFeedback();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = getValidationErrors(registerSchema, values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await register(values);
      showFeedback({ message: response?.message || 'Registro completado correctamente.', severity: 'success' });
      history.push(ROUTES.login);
    } catch (error) {
      showFeedback({ message: error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Registro" subtitle="Crea una nueva cuenta del sistema con las reglas de seguridad requeridas.">
      <form onSubmit={handleSubmit} noValidate>
        <FormTextField
          label="Nombre de usuario *"
          name="username"
          value={values.username}
          onChange={handleChange('username')}
          error={errors.username}
        />
        <FormTextField
          label="Direccion de correo *"
          name="email"
          value={values.email}
          onChange={handleChange('email')}
          error={errors.email}
        />
        <FormTextField
          label="Contrasena *"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          error={errors.password}
        />

        <Box className={classes.submitBox}>
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={loading} className={classes.submitButton}>
            {loading ? 'Registrando...' : 'Registrarme'}
          </Button>
        </Box>

        <Link component="button" variant="body1" onClick={() => history.push(ROUTES.login)} className={classes.loginLink}>
          Ya tienes una cuenta?
          <br />
          Inicia sesión
        </Link>
      </form>
    </AuthLayout>
  );
}
