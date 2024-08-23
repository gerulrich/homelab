const Channel = require('@app/models/television/channel');

const getChannels = async(req, res) => {
  const { limit = 25, offset = 0, q = '' } = req.query;
  const query = q ? { name: { $regex: q, $options: 'i' } } : {};
  const [total, channels] = await Promise.all([
    Channel.countDocuments(query),
    Channel.find(query).sort({ name: 1 }).limit(parseInt(limit)).skip(parseInt(offset))
  ]);
  res.json({
    items: channels,
    pagination: {
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    }
  });
};

const getChannelById = async(req, res) => {
  const { id } = req.params;
  const channel = await Channel.findById(id);
  if (!channel) {
    return res.status(404).json({msg: 'channel not found'});
  }
  res.json(channel);
};

const createChannel = async(req, res) => {
  const { _id, ...others } = req.body; // eslint-disable-line no-unused-vars
  const channel = new Channel(others);
  channel.save();
  res.json(channel);
};

const updateChannel = async(req, res) => {
  const { id } = req.params;
  const { _id, ...others } = req.body; // eslint-disable-line no-unused-vars
  const channel = await Channel.findByIdAndUpdate(id, others, {new : true});
  res.json(channel);
};

const deleteChannel = async(req, res) => {
  const { id } = req.params;
  const { deletedCount } = await Channel.deleteOne({_id: id});
  if (deletedCount > 0) {
    return res.status(204).json({ });
  }
  return res.status(404).json({ msg: 'Channel not found' });
};

module.exports = {
  getChannelById,
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel
};
