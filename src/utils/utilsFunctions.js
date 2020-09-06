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

export const changeTheme = theme => {
  if (theme === 'dark') {
    document.documentElement.style.setProperty('--foundation', 'rgb(253, 253, 253)');
    document.documentElement.style.setProperty('--primaryColor', 'rgb(241, 173, 62)');
    document.documentElement.style.setProperty('--primaryTextColor', 'rgb(70, 70, 70)');
    document.documentElement.style.setProperty('--secondaryGray', 'rgb(205, 205, 205)');
    document.documentElement.style.setProperty('--invalidColor', 'rgb(173, 0, 0)');
    document.documentElement.style.setProperty('--validColor', 'rgb(0, 107, 0)');
  } else {
    document.documentElement.style.setProperty('--foundation', 'rgb(36, 36, 36)');
    document.documentElement.style.setProperty('--primaryColor', 'rgb(223, 164, 69)');
    document.documentElement.style.setProperty('--primaryTextColor', 'rgb(235, 235, 235)');
    document.documentElement.style.setProperty('--secondaryGray', 'rgb(68, 68, 68)');
    document.documentElement.style.setProperty('--invalidColor', 'rgb(245, 63, 63)');
    document.documentElement.style.setProperty('--validColor', 'rgb(53, 155, 53)');
  }
};
