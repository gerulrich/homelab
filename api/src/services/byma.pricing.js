const { byma, defaultBody } = require('@app/clients/byma.client');

const BymaPricing = async (type, symbol) => {
  try {
    const resp = await byma.post(type, defaultBody);
    const items = resp.data.data || resp.data;
    const item = items.find(i => i.symbol === symbol);
    if (item) {
      return {
        price: {
          value: item.trade,
          currency: item.denominationCcy
        },
        maturity_date: item.maturityDate ? item.maturityDate : null
      };
    }
  } catch (error) {
    console.error(`Error al obtener precio de ${  symbol  } ${  error}`);
  }
  return { price: { value: 0, currency: 'USD' } };
};

const CedearPricing = async (symbol) => await BymaPricing('cedears', symbol);
const ETFPricing = async (symbol) => await BymaPricing('etf', symbol);
const ONPricing = async (symbol) => await BymaPricing('negociable-obligations', symbol);
const BondPricing = async (symbol) => await BymaPricing('public-bonds', symbol);

module.exports = {
  CedearPricing,
  ETFPricing,
  ONPricing,
  BondPricing,
};