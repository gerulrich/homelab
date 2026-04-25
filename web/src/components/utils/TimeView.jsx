import PropTypes from 'prop-types';
import { DateTimeView } from './DateTimeView';

const isSameDay = (left, right) => {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
};

export const TimeView = ({ date }) => {
  if (!date) return <></>;

  const parsedDate = new Date(date);
  const today = new Date();
  const locale = navigator.language;

  if (isSameDay(parsedDate, today)) {
    const time = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(parsedDate);
    return <>{time}</>;
  }

  return <DateTimeView date={parsedDate} />;
};

TimeView.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};
