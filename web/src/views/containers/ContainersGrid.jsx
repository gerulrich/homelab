import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from '@app/services/homelab'
import PodmanCard from '@app/components/cards/PodmanCard';

export const ContainersGrid = () => {
  
  const [counter, setCounter] = useState(0);
  const [containers, setContainers] = useState([]);
  
  useEffect(() => {
    axios.get('/containers')
      .then(response => setContainers(response.data))
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

    const pause = async (id) => {
      await axios.post(`/containers/${id}/pause`);
      setCounter(counter + 1);
    };

    const unpause = async (id) => {
      await axios.post(`/containers/${id}/unpause`);
      setCounter(counter + 1);
    }

    const remove = async (id) => {
      await axios.delete(`/containers/${id}`);
      setCounter(counter + 1);
    }
    

  return (
    <Grid container spacing={3} p={2}>
      {containers.map((container, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <PodmanCard 
            container={container}
            startContainer={start}
            stopContainer={stop}
            restartContainer={restart}
            pauseContainer={pause}
            unpauseContainer={unpause}
            removeContainer={remove}
             />
          </Grid>
      ))}
    </Grid>
  )
}

export default ContainersGrid;