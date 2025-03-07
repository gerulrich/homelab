import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '@app/components/container/PageContainer';
import axios from '@app/services/homelab'
import PodmanCard from '@app/components/cards/PodmanCard';

export const ContainersGrid = () => {
  
  const [counter, setCounter] = useState(0);
  const [containers, setContainers] = useState([]);
  
  useEffect(() => {
    axios.get('/containers')
      .then(response => {
        const c = response.data;
        c.sort((a, b) => {
          if (a.State === b.State) {
            return a.Names[0] > b.Names[0] ? 1 : -1;
          }
          return a.State === 'exited' ? 1 : -1;
        });
        setContainers(c);
      })
      .catch(error => console.error(error));
    }, [counter]);

    const start = async (id) => {
      axios.post(`/containers/${id}/start`);
      setCounter(counter + 1);
    }
    
    const stop = async (id) => {
      await axios.post(`/containers/${id}/stop`);
      setCounter(counter + 1);
    }
    
    const restart = async (id) => {
      await axios.post(`/containers/${id}/restart`);
      setCounter(counter + 1);
    };
    

  return (
    <PageContainer title="Containers" description="list of containers">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Grid container spacing={3} style={{ padding: '16px' }}>
            {containers.map((card, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <PodmanCard 
                  container={card}
                  startContainer={start}
                  stopContainer={stop}
                  restartContainer={restart} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default ContainersGrid;