const moment = require('moment');
const { DATE_FORMAT } = require('./constants');

module.exports = {
  fmtNumber: number => +number.toFixed(2),
  fmtDate: date => moment(date).format(DATE_FORMAT),

  getCurrentDate: () => moment().format(DATE_FORMAT),
  getPrevDate: date => moment(date).add(-1, 'days').format(DATE_FORMAT),
  getNextDate: date => moment(date).add(1, 'days').format(DATE_FORMAT)
};
