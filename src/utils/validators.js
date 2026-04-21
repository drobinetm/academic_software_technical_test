import { z } from 'zod';

const requiredText = (label) => z.string().trim().min(1, `${label} es obligatorio.`);

export const loginSchema = z.object({
  username: requiredText('El usuario'),
  password: requiredText('La contrasena'),
});

export const registerSchema = z.object({
  username: requiredText('El usuario'),
  email: z.string().trim().min(1, 'El correo es obligatorio.').email('Ingresa una direccion de correo valida.'),
  password: z
    .string()
    .min(9, 'La contrasena debe contener mas de 8 caracteres.')
    .max(20, 'La contrasena debe contener como maximo 20 caracteres.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'La contrasena debe incluir mayusculas, minusculas y un numero.'),
});

export const customerSchema = z.object({
  nombre: requiredText('El nombre').max(50, 'El nombre debe contener como maximo 50 caracteres.'),
  apellidos: requiredText('Los apellidos').max(100, 'Los apellidos deben contener como maximo 100 caracteres.'),
  identificacion: requiredText('La identificacion').max(20, 'La identificacion debe contener como maximo 20 caracteres.'),
  telefonoCelular: requiredText('El telefono celular').max(20, 'El telefono celular debe contener como maximo 20 caracteres.'),
  otroTelefono: requiredText('El otro telefono').max(20, 'El otro telefono debe contener como maximo 20 caracteres.'),
  direccion: requiredText('La direccion').max(200, 'La direccion debe contener como maximo 200 caracteres.'),
  fNacimiento: requiredText('La fecha de nacimiento').refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), 'Ingresa una fecha de nacimiento valida.'),
  fAfiliacion: requiredText('La fecha de afiliacion').refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), 'Ingresa una fecha de afiliacion valida.'),
  sexo: z.enum(['M', 'F'], { message: 'Selecciona un genero valido.' }),
  resenaPersonal: requiredText('La resena').max(200, 'La resena debe contener como maximo 200 caracteres.'),
  imagen: z.string().optional(),
  interesId: z.string().trim().min(1, 'Selecciona un interes valido.'),
});

export const getValidationErrors = (schema, values) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return {};
  }

  const flattened = result.error.flatten().fieldErrors;

  return Object.keys(flattened).reduce((accumulator, key) => {
    const [message] = flattened[key] || [];

    if (message) {
      accumulator[key] = message;
    }

    return accumulator;
  }, {});
};
