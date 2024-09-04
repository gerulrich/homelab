const { byma, defaultBody } = require('@app/clients/byma.client.js');
const Asset = require('@app/models/investments/asset.model.js');
const Quote = require('../models/investments/quote.model');

const fetchAndUpdateAssets = async (service, assetType, rate) => {
  try {
    const resp = await byma.post(service, defaultBody);
    const items = resp.data.data || resp.data;

    const assets = await Asset.find({ type: assetType });
    const symbols = assets.map(asset => asset.symbol);

    const itemsToUpdate = items.filter(item => symbols.includes(item.symbol) && item.trade > 0);
    const updateOperations = itemsToUpdate.map(item => {
      const endsWithD = item.symbol.endsWith('D');
      const value = endsWithD ? item.trade : Number(item.trade * rate).toFixed(2);
      const currency = endsWithD ? item.denominationCcy : 'USD';
      return {
        updateOne: {
          filter: { symbol: item.symbol },
          update: { $set: { price: { value, currency } } }
        }
      };
    });
    await Asset.bulkWrite(updateOperations);
  } catch (error) {
    console.error(`Error updating ${assetType}:`, error);
  }
};

const fetchAndUpdateQuotes = async () => {
  try {
    const resp = await byma.post('public-bonds', defaultBody);
    const items = resp.data.data || resp.data;

    const symbols = ['AL30', 'AL30D'];
    const itemsToUpdate = items.filter(item => symbols.includes(item.symbol));
    const itemARS = itemsToUpdate.find(item => item.symbol === 'AL30');
    const itemUSD = itemsToUpdate.find(item => item.symbol === 'AL30D');
    const rate = itemUSD.trade / itemARS.trade;

    await Quote.findOneAndUpdate(
      { asset: 'ARS' },
      { $set: { rate: rate, date:  new Date() }},
      { upsert: true }
    );
    return rate;
  } catch (error) {
    console.error('Error updating quotes for currency ARS:', error);
  }
};

const investmentJob = async () => {
  const rate = await fetchAndUpdateQuotes();
  const requests = [
    fetchAndUpdateAssets('etf', 'cedear', rate),
    fetchAndUpdateAssets('cedears', 'cedear', rate),
    fetchAndUpdateAssets('public-bonds', 'bono', rate),
    fetchAndUpdateAssets('negociable-obligations', 'on', rate),
  ];
  await Promise.all(requests);
};

module.exports = investmentJob;