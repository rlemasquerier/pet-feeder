import moment from 'moment';
import { Sex } from 'pet-feeder/src/types';

export const getRecordHourFromTimestamp = (timestamp: number) => {
  return moment(timestamp).format('HH:mm');
};

export const genderizeWord = (word: string, gender: Sex | undefined) => {
  return `${word}${gender === 'female' ? 'e' : ''}`;
};
