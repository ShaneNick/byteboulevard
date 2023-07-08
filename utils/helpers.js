const moment = require('moment');

const format_date = (date) => {
  // Format date as MM/DD/YYYY, HH:mm
  return moment(date).format('MM/DD/YYYY, HH:mm');
};

module.exports = {
  format_date,
};
