import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import CustomTextField from '@app/components/customs/CustomTextField';
import CustomFormLabel from '@app/components/customs/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';

export const RegisterForm = ({ title, subtitle, subtext }) => {
  return (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}
    <AuthSocialButtons title="Sign up with" text="signup_with"/>

    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          or sign up with
        </Typography>
      </Divider>
    </Box>

    <Box>
      <Stack mb={3}>
        <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
        <CustomTextField id="name" variant="outlined" fullWidth />
        <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
        <CustomTextField id="email" variant="outlined" fullWidth />
        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
        <CustomTextField id="password" variant="outlined" fullWidth />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        to="/auth/login"
      >
        Sign Up
      </Button>
    </Box>
    {subtitle}
  </>
  )
}

export default RegisterForm;