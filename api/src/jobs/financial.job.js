const { byma, defaultBody } = require('@app/clients/byma.client.js');
const Asset = require('@app/models/investments/asset.model.js');
const Quote = require('@app/models/investments/quote.model');
const Notification = require('@app/models/notification.model');

const fetchAndUpdateAssets = async (service, assetType, rate) => {
  try {
    const resp = await byma.post(service, defaultBody);
    const items = resp.data.data || resp.data;

    const assets = await Asset.find({ type: assetType });
    const symbols = assets.map(asset => asset.symbol);

    const itemsToUpdate = items.filter(item => symbols.includes(item.symbol) && item.trade > 0);
    const updateOperations = itemsToUpdate.map(item => {
      const value = item.denominationCcy === 'ARS' ? Number(item.trade * rate).toFixed(2) : item.trade;
      const currency = 'USD';
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
  const resp = await byma.post('public-bonds', defaultBody);
  const items = resp.data.data || resp.data;

  const symbols = ['AL30', 'AL30D'];
  const itemsToUpdate = items.filter(item => symbols.includes(item.symbol));
  const itemARS = itemsToUpdate.find(item => item.symbol === 'AL30');
  const itemUSD = itemsToUpdate.find(item => item.symbol === 'AL30D');
  const rate = itemUSD.trade / itemARS.trade;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  await Quote.findOneAndUpdate(
    { asset: 'ARS', date:  currentDate },
    { $set: { rate: rate, date:  new Date() }},
    { upsert: true }
  );
  return rate;
};

const financialJob = async (io) => {
  try {
    const rate = await fetchAndUpdateQuotes();
    const requests = [
      fetchAndUpdateAssets('etf', 'cedear', rate),
      fetchAndUpdateAssets('cedears', 'cedear', rate),
      fetchAndUpdateAssets('public-bonds', 'bono', rate),
      fetchAndUpdateAssets('negociable-obligations', 'on', rate),
      fetchAndUpdateAssets('leading-equity', 'local-stock', rate),
    ];
    await Promise.all(requests);
  } catch (error) {
    console.error('Error updating investments:', error);
    console.error('Financial job encountered an error:', error);
    await Notification.findOneAndUpdate(
      { type: 'system',
        component: 'financial',
        severity: 'error',
        content: 'Financial job encountered an error',
        read: false 
      }, { created: new Date() }, { upsert: true });
    io.to('admin').emit('notification', { 
      type: 'system',
      component: 'epg',
      severity: 'financial',
      content: 'Financial job encountered an error' });
  }
};

module.exports = financialJob;