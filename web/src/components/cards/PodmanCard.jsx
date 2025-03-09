import { useState } from 'react';
import { Box, Typography, Avatar, CardContent, Stack, IconButton, MenuItem, Menu, ListItemIcon } from '@mui/material';  
import BlankCard from '@app/components/common/BlankCard';
import MqttIcon from '@app/assets/containers/mqtt.svg';
import ZigbeeIcon from '@app/assets/containers/zigbee.svg';
import VaultwargenIcon from '@app/assets/containers/vaultwarden.svg';
import PiholeIcon from '@app/assets/containers/pihole.svg';
import TransmissionIcon from '@app/assets/containers/transmission.svg';
import MongoIcon from '@app/assets/containers/mongo.svg';
import GuacamoleIcon from '@app/assets/containers/guacamole.svg';
import HomeassistantIcon from '@app/assets/containers/homeassistant.svg';
import NoderedIcon from '@app/assets/containers/nodered.svg';
import PlexIcon from '@app/assets/containers/plex.svg';
import CloudflareIcon from '@app/assets/containers/cloudflare.svg';
import WireguardIcon from '@app/assets/containers/wireguard.svg';
import ESPHomeIcon from '@app/assets/containers/esphome.svg';
import NginxIcon from '@app/assets/containers/nginx.svg';
import PhotoprismIcon from '@app/assets/containers/photoprism.svg';
import MongoExpressIcon from '@app/assets/containers/mongo-express.png';
import LedFxIcon from '@app/assets/containers/ledfx.png';
import MqttExplorerIcon from '@app/assets/containers/mqtt-explorer.png';
import { IconDotsVertical, IconRefresh, IconPlayerPlay, IconPlayerStop, IconLink, IconPlayerPause } from '@tabler/icons-react';
import { Can } from '@app/components/guards/Can';

const PodmanCard = ({ container, stopContainer, startContainer, restartContainer, pauseContainer, unpauseContainer }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
 

  const getIcon = (name) => {
    switch (name) {
      case 'mqtt':
        return <MqttIcon height={32} fill='#660066' />;
      case 'zigbee':
        return <ZigbeeIcon height={32} fill='#FFC135' />;
      case 'vaultwarden':
        return <VaultwargenIcon height={32} fill='#FFFFFF' />;
      case 'pihole':
        return <PiholeIcon height={32} fill='#96060C' />;
      case 'transmission':
        return <TransmissionIcon height={32} fill='#D70008' />;
      case 'mongo':
        return <MongoIcon height={32} fill='#47A248' />;
      case 'guacamole':
        return <GuacamoleIcon height={32} fill='#578B34' />;
      case 'homeassistant':
        return <HomeassistantIcon height={32} fill='#18BCF2' />;
      case 'nodered':
        return <NoderedIcon height={32} fill='#8F0000' />;
      case 'plex':
        return <PlexIcon height={32} fill='#EBAF00' />;
      case 'cloudflare':
        return <CloudflareIcon height={32} fill='#F38020' />;
      case 'wireguard':
        return <WireguardIcon height={32} fill='#88171A' />;
      case 'esphome':
        return <ESPHomeIcon height={32} fill='#FFFFFF' />;
      case 'nginx':
        return <NginxIcon height={32} fill='#009639' />;
      case 'photoprism':
        return <PhotoprismIcon height={36} />;
      case 'mongo-express':
        return <Avatar src={MongoExpressIcon} />;
      case 'ledfx':
        return <Avatar src={LedFxIcon} />;
      case 'mqtt-explorer':
        return <Avatar src={MqttExplorerIcon} />;
      default:
        return <Avatar>{name[0].toUpperCase()}</Avatar>;
    }
  };

  const onStop = (id) => {
    handleClose();
    stopContainer(id);
  }

  const onStart = (id) => {
    handleClose();
    startContainer(id);
  }

  const onRestart = (id) => {
    handleClose();
    restartContainer(id);
  }

  const onPause = (id) => {
    handleClose();
    pauseContainer(id);
  }

  const onUnpause = (id) => {
    handleClose();
    unpauseContainer(id);
  }

  return (
    <BlankCard>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            {getIcon(container.name)}
            <Box>
              <Typography variant="h6">{container.name}</Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap="3px"
                >
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap="3px"
                >
                {container.status}
              </Typography>
            </Box>
          </Stack>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            size="small"
            onClick={handleClick}
          >
          <IconDotsVertical size="22" />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        
        {
            container.state === 'paused' &&
             (<Can I="manage" a="Container">
                  <MenuItem onClick={() => onUnpause(container.id)}>
                    <ListItemIcon>
                      <IconPlayerPlay size="16" />
                    </ListItemIcon>
                    Continuar
                  </MenuItem>
                </Can>)
          }
          {
            container.state === 'exited' &&
             (<Can I="manage" a="Container">
                  <MenuItem onClick={() => onStart(container.id)}>
                    <ListItemIcon>
                      <IconPlayerPlay size="16" />
                    </ListItemIcon>
                    Iniciar
                  </MenuItem>
                </Can>)
          }

          {
            container.state === 'running' && (
              <Can I="manage" a="Container">
              <MenuItem onClick={() => onPause(container.id)}>
              <ListItemIcon>
                <IconPlayerPause size="16" />
              </ListItemIcon>
              Pausar
            </MenuItem>
            </Can>
            )
          }

          {
            container.state === 'running' && (
              <Can I="manage" a="Container">
              <MenuItem onClick={() => onStop(container.id)}>
              <ListItemIcon>
                <IconPlayerStop size="16" />
              </ListItemIcon>
              Detener
            </MenuItem>
            </Can>
            )
          }

          {
            container.state === 'running' && (
            <Can I="manage" a="Container">
              <MenuItem onClick={() => onRestart(container.id)}>
                <ListItemIcon>
                  <IconRefresh size="16" />
                </ListItemIcon>
                Reiniciar
              </MenuItem>
            </Can>
            )
          }

          {/*
            <MenuItem onClick={() => console.log('clicked')}>
              <ListItemIcon>
                <IconLink size="16" />
              </ListItemIcon>
              Visitar
            </MenuItem>
            */}

        </Menu>

        </Stack>
        


      </CardContent>
    </BlankCard>
  );
};

export default PodmanCard;