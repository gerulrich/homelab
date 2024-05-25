const { byma, defaultBody } = require('@app/clients/byma.client.js');
const Asset = require('@app/models/investments/asset.model.js');

const fetchAndUpdateAssets = async (service, assetType) => {
  try {
    const resp = await byma.post(service, defaultBody);
    const items = resp.data.data || resp.data;

    const assets = await Asset.find({ type: assetType });
    const symbols = assets.map(asset => asset.symbol);

    const itemsToUpdate = items.filter(item => symbols.includes(item.symbol) && item.trade > 0);
    const updateOperations = itemsToUpdate.map(item => ({
      updateOne: {
        filter: { symbol: item.symbol },
        update: { $set: { price: { value: item.trade, currency: item.denominationCcy } } }
      }
    }));
    await Asset.bulkWrite(updateOperations);
  } catch (error) {
    console.error(`Error updating ${assetType}:`, error);
  }
};

const investmentJob = async () => {
  const requests = [
    fetchAndUpdateAssets('etf', 'cedear'),
    fetchAndUpdateAssets('cedears', 'cedear'),
    fetchAndUpdateAssets('public-bonds', 'bono'),
    fetchAndUpdateAssets('negociable-obligations', 'on')
  ];
  await Promise.all(requests);
};

module.exports = investmentJob;