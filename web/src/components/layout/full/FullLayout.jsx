import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { styled, Container, Box, useTheme } from '@mui/material';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import { DevelopmentHeader } from '@app/components/customs/DevelopmentHeader';
import useAuth from '../../guards/UseAuth';
import defineAbilityFor from '@app/services/abilities';
import { AbilityContext } from '../../guards/Can';


const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const customizer = useSelector((state) => state.customizer);

  const theme = useTheme();
  const { user } = useAuth();
  const ability = defineAbilityFor(user);

  return (
    <AbilityContext.Provider value={ability}>
      {
        import.meta.env.DEV ? (<DevelopmentHeader />) : (<></>)
      }
    <MainWrapper
      className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header/>
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
    </AbilityContext.Provider>
  );
};

export default FullLayout;