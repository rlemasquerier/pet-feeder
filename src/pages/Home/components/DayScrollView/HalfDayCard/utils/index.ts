import moment from 'moment';

export const getRecordHourFromTimestamp = (timestamp: number) => {
  return moment(timestamp).format('HH:mm');
};
