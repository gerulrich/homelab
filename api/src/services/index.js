const { CedearPricing, ETFPricing, ONPricing, BondPricing } = require('./byma.pricing');
const ForeignPricing = require('./foreing.pricing');

const { getJwt, getPrograms } = require('./flow');

const getPricingStrategy = (type) => {
  switch (type) {
    case 'cedear':
      return CedearPricing;
    case 'cedear-etf':
      return ETFPricing;
    case 'bono':
      return BondPricing;
    case 'on':
      return ONPricing;
    default:
      return ForeignPricing;
  }
};

module.exports = { 
  getPricingStrategy,
  getPrograms,
  getJwt
};
