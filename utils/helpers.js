const moment = require('moment');

const format_date = (date) => {
    // Format date as MM/DD/YYYY
    return moment(date).format('MM/DD/YYYY');
};

module.exports = {
    format_date,
};
