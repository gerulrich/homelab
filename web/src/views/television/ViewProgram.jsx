import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ProgramDetail from './fragments/ProgramDetail';
import ChildCard from '../../components/common/ChildCard';
import ProgramPlayer from './fragments/ProgramPlayer';
import { useParams } from 'react-router-dom';
import axios from '@app/services/homelab'

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

  // Get Products
  const [program, setProgram] = useState({
    title: '',
    photo: "/images/products/s1.jpg",
    id: 1,
    description: '',
  });

  useEffect(() => {
    axios.get(`/tv/programs/${programId}`)
      .then(resp => {
        setProgram(resp.data);
      }).catch(err => {
        console.error(err);
        //setError(err.message);
      });
  }, [programId]);
  
  return (
    <PageContainer title="eCommerce Detail" description="this is eCommerce Detail">
      {/* breadcrumb */}
      <Breadcrumb title="Program Detail" items={BCrumb} />
      <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
            {/* ------------------------------------------- */}
            {/* Carousel */}
            {/* ------------------------------------------- */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                  <ProgramPlayer program={program}/>
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