import PropTypes from 'prop-types';

export const MoneyView = ({ amount, currency }) => {
  const formatMoney = (amount, currency) => {
    if (amount == null) return '';
    
    const locale = navigator.language;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return <>{formatMoney(amount, currency)}</>;
};

MoneyView.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};