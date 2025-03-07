import { Box, Typography, CardContent, Stack } from '@mui/material';  
import { IconBulb, IconBulbOff } from '@tabler/icons-react';

const PodmanCard = ({ device }) => {
  return (
    <BlankCard>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <IconBulbOff />
            <Box>
              <Typography variant="h6">{device.name}</Typography>
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
                {device.status}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </BlankCard>
  );
};

export default PodmanCard;