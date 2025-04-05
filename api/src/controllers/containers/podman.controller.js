const { podman } = require('@app/clients/podman.client.js');

const getContainers = async (req, res) => {
  try {
    const { data } = await podman.get('/containers/json', { params: { all: true } });
    const containers = data.map(({ Id, Names, Image, State, Status }) => ({
      id: Id,
      name: Names[0].slice(1),
      image: Image,
      state: State,
      status: Status
    }));

    containers.sort((a, b) => 
      (a.state === b.state ? a.name.localeCompare(b.name) : a.state === 'exited' ? 1 : -1)
    );

    res.json(containers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const startContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/start`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const pauseContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/pause`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unpauseContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/unpause`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const stopContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/stop`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restartContainer = async(req, res) => {
  try {
    const container = await podman.post(`/containers/${req.params.id}/restart?t=30`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeContainer = async(req, res) => {
  try {
    const container = await podman.delete(`/containers/${req.params.id}`);
    res.json(container.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getContainers,
  startContainer,
  pauseContainer,
  unpauseContainer,
  stopContainer,
  restartContainer,
  removeContainer
};