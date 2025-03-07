const { podman } = require('@app/clients/podman.client.js');

const getContainers = async(req, res) => {
  const containers = await podman.get('/containers/json', {
    params: {
      all: true
    }
  });
  res.json(containers.data);
}

const startContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/start`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const stopContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/stop`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const restartContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/restart?t=30`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getContainers,
  startContainer,
  stopContainer,
  restartContainer
};