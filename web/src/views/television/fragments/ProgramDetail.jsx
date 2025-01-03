import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Link, useTheme } from '@mui/material';
import { DateTimeView } from '../../../components/utils/DateTimeView';

const ProgramDetail = ({program}) => {
  const theme = useTheme();
  return (
    <Box p={2}>
      {program ? (
        <>
          <Box display="flex" alignItems="center">
            {/* ------------------------------------------- */}
            {/* Badge and category */}
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


          <Typography fontWeight="200" variant="h4" mt={1}>
            Fecha de emision: <DateTimeView date={program.start}/>
          </Typography>

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