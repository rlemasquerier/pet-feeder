import { Moment } from 'moment';

export const MORNING = 'morning';
export const EVENING = 'afternoon';

export const computeDayHalf = (date: Moment): typeof MORNING | typeof EVENING => {
  const eveningToMorningThreshold = 3;
  const morningToEveningThreshold = 15;
  if (date.hour() >= eveningToMorningThreshold && date.hour() < morningToEveningThreshold) {
    return MORNING;
  }
  return EVENING;
};
