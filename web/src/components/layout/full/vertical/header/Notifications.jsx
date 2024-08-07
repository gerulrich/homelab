import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import Scrollbar from '@app/components/customs/Scrollbar';

import { IconBellRinging, IconTrash } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { markAllNotificationsAsRead } from '@app/store/slices';
import { useDispatch } from 'react-redux';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.websocket.socket.notifications);
  const news = notifications.filter(item => !item.read).length;

  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleReadAllNotifications = () => {
    dispatch(markAllNotificationsAsRead());
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        {
          news === 0
            ? (<IconBellRinging size="21" stroke="1.5" />)
            : (
              <Badge variant="dot" color="primary">
                <IconBellRinging size="21" stroke="1.5" />
              </Badge>
            )
        }
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Notifications</Typography>
          {
            news > 0 && (<Chip label={`${news} news`} color="primary" size="small" />)
          }
          <IconButton onClick={handleReadAllNotifications} variant="outlined" color="primary">
            <IconTrash size="21" stroke="1"/>
          </IconButton>
        </Stack>
        <Scrollbar sx={{ height: '385px' }}>
          {notifications.map((notification, index) => (
            <Box key={index}>
              <MenuItem sx={{ py: 2, px: 4 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    src={notification.avatar}
                    alt={notification.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: '240px',
                        fontWeight: notification.read ? 'normal' : 'bold'
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {notification.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button to="/apps/email" variant="outlined" component={Link} color="primary" fullWidth>
            See all Notifications
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;