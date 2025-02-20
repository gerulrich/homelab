import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Link, Switch, useTheme } from '@mui/material';
import { DateTimeView } from '../../../components/utils/DateTimeView';

import React from 'react';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled((props) => <Switch {...props} />)(({ theme }) => ({
  '&.MuiSwitch-root': {
    width: '68px',
    height: '49px',
  },
  '&  .MuiButtonBase-root': {
    top: '6px',
    left: '6px',
  },
  '&  .MuiButtonBase-root.Mui-checked .MuiSwitch-thumb': {
    backgroundColor: 'primary.main',
  },
  '& .MuiSwitch-thumb': {
    width: '18px',
    height: '18px',
    borderRadius: '6px',
  },

  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    borderRadius: '5px',
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: 'primary',
        opacity: 0.18,
      },
    },
  },
}));

const ProgramDetail = ({program}) => {
  const theme = useTheme();
  const viewPlayer = program?.media_url?.startsWith('http');
  return (
    <Box p={2}>
      {program ? (
        <>
          <Box display="flex" alignItems="center">
            {/* ------------------------------------------- */}
            {/* Genre and channel name */}
            {/* ------------------------------------------- */}
            <Chip label={program?.genre} color="success" size="small" />
            <Typography color="textSecondary" variant="caption" ml={1} textTransform="capitalize">
              {program?.channel_name}
            </Typography>
          </Box>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Typography fontWeight="600" variant="h4" mt={1}>
            {program?.title} {program?.episode_title ? ` - ${program?.episode_title}` : ''}
          </Typography>
          <Typography variant="subtitle2" mt={1} color={theme.palette.text.secondary}>
            {program?.description}
          </Typography>


          {program.start && (<Typography fontWeight="200" variant="h4" mt={1}>
            Fecha de emision: <DateTimeView date={program.start}/>
          </Typography>)}

          {new Date(program.start) > new Date() ? <Typography sx={{ color: (theme) => theme.palette.warning.main }} variant="h6">
              Programa no emitido
            </Typography> : null}

          {
            viewPlayer ? <Box alignItems="center" display="flex" mt={2}>
              <CustomSwitch name="proxy" />
                <Typography ml={1} variant="body1">Utilizar proxy server</Typography>
            </Box> : null
          }

          {/* ------------------------------------------- */}
          {/* Buttons */}
          {/* ------------------------------------------- */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} lg={4} md={6}>
              <Button
                color="primary"
                size="large"
                fullWidth
                component={Link}
                variant="contained"
                href="/apps/eco-checkout"
              >
                Play
              </Button>
            </Grid>
            <Grid item xs={12} lg={4} md={6}>
              <Button
                color="error"
                size="large"
                fullWidth
                variant="contained"
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        'No program'
      )}
    </Box>
  );
};

export default ProgramDetail;