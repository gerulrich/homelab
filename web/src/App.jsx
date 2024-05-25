import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeSettings } from '@app/theme/Theme';
import { AppRouter } from '@app/routes';

const App = () => {
  const theme = ThemeSettings();
  const routing = useRoutes(AppRouter);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  )
}

export default App;
