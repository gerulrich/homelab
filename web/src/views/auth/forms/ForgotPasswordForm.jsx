import { Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import CustomTextField from '@app/components/customs/CustomTextField';
import CustomFormLabel from '@app/components/customs/CustomFormLabel';

export const ForgotPasswordForm = () => {
  return (
    <>
    <Stack mt={4} spacing={2}>
      <CustomFormLabel htmlFor="reset-email">Email Adddress</CustomFormLabel>
      <CustomTextField id="reset-email" variant="outlined" fullWidth />

      <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/">
        Forgot Password
      </Button>
      <Button color="primary" size="large" fullWidth component={Link} to="/auth/login">
        Back to Login
      </Button>
    </Stack>
    </>
  )
}
