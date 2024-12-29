import Box from '@mui/material/Box';
import { VideoPlayer } from './VideoPlayer';

const ProgramPlayer = ({program}) => {
    return (
        <Box>
        {/*
        (program && program.media_url) ? (<ShakaPlayerComponent media={program} />): (<img src={program?.image} alt="program"
            style={{ borderRadius: '5px'}} />)
        */}
        <VideoPlayer media={program} />
        </Box>
  );
};

export default ProgramPlayer;
