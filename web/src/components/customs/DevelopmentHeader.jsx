import { Typography } from '@mui/material';

export const DevelopmentHeader = () => {
  return (
    <header style={{ position: 'sticky', top: 0, backgroundColor: 'orange', padding: '0px', textAlign: 'center' }}>
      <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
        development mode {
          import.meta.env.MODE != "development" ? (<>with {import.meta.env.MODE} enabled</>): (<></>)
        } (version {APP_VERSION})
      </Typography>
    </header>
  );
};