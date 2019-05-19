import { Moment } from 'moment';

export const computeDayHalf = (date: Moment) => {
  const eveningToMorningThreshold = 4;
  const morningToEveningThreshold = 15;
  if (date.hour() >= eveningToMorningThreshold && date.hour() < morningToEveningThreshold) {
    return 'morning';
  }
  return 'evening';
};
