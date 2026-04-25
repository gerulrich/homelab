import PropTypes from 'prop-types';

export const DateTimeView = ({ date }) => {
  const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    const locale = navigator.language;

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(parsedDate);
  };

  return (
    <>{formatDate(date)}</>
  )
}

DateTimeView.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};