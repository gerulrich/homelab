const Asset = require('@app/models/investments/asset.model');
const { getPricingStrategy } = require('@app/services');

const createAsset = async (req, res) => {
  const { type, symbol, ...data } = req.body;
  const strategy = getPricingStrategy(type);
  try {
    const { price, maturityDate } = await strategy(symbol);
    const assetData = {
      type: type === 'cedear-etf' ? 'cedear' : type,
      symbol,
      price,
      maturityDate,
      ...data
    };
    const asset = new Asset(assetData);
    await asset.save();
    res.status(201).json(asset);
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ error: 'Error creating asset' });
  }
};

const getAllAssets = async (req, res) => {
  const { limit = 25, offset = 0, q = '' } = req.query;
  const query = q ? { name: { $regex: q, $options: 'i' } } : {};
  const [total, assets] = await Promise.all([
    Asset.countDocuments(query),
    Asset.find(query).sort({ name: 1 }).limit(parseInt(limit)).skip(parseInt(offset))
  ]);
  res.json({
    items: assets,
    pagination: {
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    }
  });
};

const getAssetById = async (req, res) => {
  const { id } = req.params;
  const asset = await Asset.findById(id);
  if (!asset) {
    return res.status(404).json({ message: 'Asset not found' });
  }
  return res.json(asset);
};

const updateAssetById = async (req, res) => {
  const { id } = req.params;
  const { uid, ...data } = req.body; // eslint-disable-line no-unused-vars
  const asset = await Asset.findByIdAndUpdate(id, data, { new: true });
  return res.json(asset);
};

const deleteAssetById = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await Asset.deleteOne({ _id: id });
  if (deletedCount === 0) {
    return res.status(404).json({ msg: `Asset ${id} not found` });
  }
  res.status(204).end();
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAssetById,
  deleteAssetById
};
