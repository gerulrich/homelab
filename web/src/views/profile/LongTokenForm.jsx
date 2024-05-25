import { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';


const LongTokenForm = () => {
  const [token, setToken] = useState(''); // TODO aca se guarda el token.

  const validationSchema = yup.object({
    description: yup
      .string('Enter description for new token')
      .required('Description is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { description: '', email: '', password: ''},
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => { 
      setSubmitting(true);
      homelab.post('/auth/token', values )
        .then(response => {
          setPageState({error: null, completed: true});
        })
        .catch(error => {
          setPageState({error: error.message, completed: false});
        })
        .finally(() => setSubmitting(false));
    }
  });  
  
  
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Generar Token de Larga Duración
        </Typography>
        <TextField
          fullWidth
          label="Usuario"
          variant="outlined"
          margin="normal"
          // Aquí podrías agregar un estado para el usuario si es necesario
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          variant="outlined"
          margin="normal"
          // Aquí podrías agregar un estado para la contraseña si es necesario
        />
        <Button
          variant="contained"
          color="primary"
          onClick={generateToken}
          sx={{ marginTop: 2 }}
        >
          Generar Token
        </Button>
        {token && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">
              Token de Larga Duración: {token}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default LongTokenForm;
