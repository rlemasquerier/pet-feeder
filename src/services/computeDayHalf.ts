import { Moment } from 'moment';

export const computeDayHalf = (date: Moment): 'morning' | 'evening' => {
  const eveningToMorningThreshold = 3;
  const morningToEveningThreshold = 15;
  if (date.hour() >= eveningToMorningThreshold && date.hour() < morningToEveningThreshold) {
    return 'morning';
  }
  return 'evening';
};
