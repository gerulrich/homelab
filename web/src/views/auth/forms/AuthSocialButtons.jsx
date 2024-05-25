import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import useAuth from '@app/components/guards/UseAuth';

const AuthSocialButtons = ({ title, text }) => {
  const { loginWithGoogle } = useAuth();
  const { activeMode } = useSelector((state) => state.customizer);
  const responseMessage = (response) => loginWithGoogle(response.credential);
  const errorMessage = (error) => console.log(error);

  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <GoogleLogin 
          onSuccess={responseMessage}
          onError={errorMessage}
          text={text}
          theme={activeMode === 'dark' ? "filled_black" : ""} />
      </Stack>
    </>
  );
};
export default AuthSocialButtons;
