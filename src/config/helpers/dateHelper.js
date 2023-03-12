import { DATE_FORMAT, DATE_FORMAT_TEXT } from 'config/constants/calendar';
import moment from 'moment';

const dateHelper = {
  format: (date) => {
    return moment(date).format(DATE_FORMAT);
  },

  formatText: (date) => {
    return moment(date).format(DATE_FORMAT_TEXT);
  },

  compareDateByMinutes: (date1, date2) => {
    return moment(date2).diff(date1, 'minutes');
  },

  equalDate: (date1, date2) => {
    return moment(date1).format('YYYY/MM/DD') === moment(date2).format('YYYY/MM/DD');
  },

  sortByDate: (list) => {
    return list.sort((a, b) => {
      return moment(b.date).diff(a.date, 'minutes');
    });
  },

  sortCurrentTime: (list) => {
    return list.sort((a, b) => {
      const difA = Math.abs(dateHelper.compareDateByMinutes(new Date(), a.date));
      const difB = Math.abs(dateHelper.compareDateByMinutes(new Date(), b.date));

      return difA - difB;
    });
  },

  groupByMonth: (data) => {
    const groupedData = data.reduce((acc, item) => {
      const date = moment(item.date).format('MM');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
    const result = [];
    for (let i = 0; i < 12; i++) {
      const date = moment().month(i).format('MM');
      result.push(groupedData[date] ? groupedData[date].length : 0);
    }
    return result;
  },

  groupByDate: (data) => {
    const groupedData = data.reduce((acc, item) => {
      const date = moment(item.date).format('YYYY/MM/DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
    return Object.keys(groupedData).map((key) => new Date(key));
  },

  formatDuration: (data) => {
    const date = Math.abs(data);
    const minutes = date % 60;
    const hours = Math.floor(date / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${data < 0 ? 'ago' : 'left'}`;
    } else if (hours > 0) {
      return `${hours % 24}h ${data < 0 ? 'ago' : 'left'}`;
    } else {
      return `${minutes % 60}min ${data < 0 ? 'ago' : 'left'}`;
    }
  },
};

export default dateHelper;
