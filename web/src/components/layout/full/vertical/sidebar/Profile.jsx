import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import img1 from '@app/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons-react';
import {Link} from "react-router-dom";
import useAuth from '@app/components/guards/UseAuth';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const { logout, user, } = useAuth();
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={user?.picture} />

          <Box>
            <Typography variant="h6"  color="textPrimary">{user?.name}</Typography>
            <Typography variant="caption" color="textSecondary">Admin</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton 
                onClick={logout}
                color="primary"
                component={Link}
                aria-label="logout"
                size="small">
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
