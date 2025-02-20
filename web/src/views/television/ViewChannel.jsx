import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ChildCard from '../../components/common/ChildCard';
import { VideoPlayer } from './fragments/VideoPlayer';
import { useParams } from 'react-router-dom';
import axios from '@app/services/homelab'
import { Alert } from '@mui/material';
import ProgramDetail from './fragments/ProgramDetail';
//import img1 from '@app/assets/images/movie_poster.png';

const BCrumb = [
  {
    to: '/', 
    title: 'Home',
  },
  {
    title: 'Canales',
    to: '/tv/channels',
  },
  {
    title: 'reproductor',
  },
];


const ViewChannel = () => {
  const { channelId } = useParams();
  const [error, setError] = useState(null);
  const [viewPlayer, setViewPlayer] = useState(false);

  // Get Products
  const [channel, setChannel] = useState({
    name: '',
    media_url: null,
    image: '',
    drm: {type:'none'},
  });

  const [program, setProgram] = useState({
    title: '',
    image: null,
    description: '',
    date: null
  });

  useEffect(() => {
    axios.get(`/tv/channels/${channelId}`)
      .then(resp => {
        setChannel(resp.data);
        setViewPlayer(resp.data.media_url.startsWith('http'));
      }).catch(err => {
        setError(err.message);
      });

    axios.get(`/tv/channels/${channelId}/current`)
    .then(resp => {
      setProgram(resp.data);
    }).catch(err => {
      setError(err.message);
    });
  }, [channelId]);
  
  return (
    <PageContainer description="this is chanel detail" title="channel player">
      {/* breadcrumb */}
      <Breadcrumb items={BCrumb} title="Channel Detail" />
      <Grid container spacing={3}>
        <Grid item lg={12} sm={12} xs={12}>
          <ChildCard>
          {error ? <Alert severity="error">{error}</Alert> : null}
            <Grid container spacing={3}>
              <Grid item lg={7} sm={12} xs={12}>
                <VideoPlayer media={channel} onError={setError}/>
              </Grid>
              <Grid item lg={5} sm={12} xs={12}>
                <ProgramDetail program={program}/>
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        <Grid item lg={12} sm={12} xs={12} />
        <Grid item lg={12} sm={12} xs={12} />
      </Grid>
    </PageContainer>
  );
};


export default ViewChannel;