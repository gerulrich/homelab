import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ProgramDetail from './fragments/ProgramDetail';
import ChildCard from '../../components/common/ChildCard';
import { VideoPlayer } from './fragments/VideoPlayer';
import { useParams } from 'react-router-dom';
import axios from '@app/services/homelab'
import { Alert } from '@mui/material';

const BCrumb = [
  {
    to: '/', 
    title: 'Home',
  },
  {
    title: 'Programas',
    to: '/settings/programs',
  },
  {
    title: 'detalle',
  },
];


const ViewProgram = () => {
  const { programId } = useParams();
  const [error, setError] = useState(null);
  const [viewPlayer, setViewPlayer] = useState(false);

  // Get Products
  const [program, setProgram] = useState({
    title: '',
    media_url: null,
    image: null,
    description: '',
    drm: {type:'none'},
    date: null
  });

  useEffect(() => {
    axios.get(`/tv/programs/${programId}`)
      .then(resp => {
        setProgram(resp.data);
        setViewPlayer(resp.data.media_url.startsWith('http'));
      }).catch(err => {
        setError(err.message);
      });
  }, [programId]);
  
  return (
    <PageContainer title="eCommerce Detail" description="this is eCommerce Detail">
      {/* breadcrumb */}
      <Breadcrumb title="Program Detail" items={BCrumb} />
      <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
          {error && (<Alert severity="error">{error}</Alert>)}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
              <Grid style={{ display: viewPlayer ? 'block' : 'none' }}>
                <VideoPlayer media={program} onError={setError}/>
              </Grid>
              <Grid style={{ display: viewPlayer ? 'none' : 'block' }}>
                <img src={program?.image} alt="program" style={{ borderRadius: '5px'}} />
              </Grid>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <ProgramDetail program={program}/>
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          
        </Grid>
      </Grid>
    </PageContainer>
  );
};


export default ViewProgram;