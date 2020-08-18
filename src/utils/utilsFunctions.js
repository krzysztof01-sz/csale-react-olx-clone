import moment from 'moment';

const brightStarColor = '#f1ad3e';
const dimStarColor = '#cdcdcd';
const maxnoticeCondition = 5;

export const formatDate = date => {
  const readableDate = moment(Number(date)).calendar();
  const formattedDate = String(readableDate).replace(/["/"]/g, '.');
  return formattedDate;
};

export const getDateInSeconds = () => Date.now();

export const renderNoticeCondition = noticeCondition => {
  const renderOrder = [];
  for (let i = 1; i <= maxnoticeCondition; i++) {
    i <= noticeCondition ? renderOrder.push(brightStarColor) : renderOrder.push(dimStarColor);
  }
  return renderOrder;
};
