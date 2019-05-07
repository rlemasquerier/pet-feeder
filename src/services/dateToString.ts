import { Moment } from 'moment';

export const dateToString = (date: Moment) => {
  return date.format('YYYYMMDD');
};
