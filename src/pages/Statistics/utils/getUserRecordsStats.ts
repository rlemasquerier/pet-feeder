import moment from 'moment';
import { computeDayHalf, MORNING, EVENING } from '../../../services';
import { Record } from '../../../types';

export const getUserRecordsStats = (recordsList: Record[]) => {
  return [
    { label: 'Repas', value: recordsList.length },
    {
      label: 'Matins',
      value: recordsList.filter(
        (record: Record) => computeDayHalf(moment(record.timestamp)) === MORNING
      ).length,
    },
    {
      label: 'Soirs',
      value: recordsList.filter(
        (record: Record) => computeDayHalf(moment(record.timestamp)) === EVENING
      ).length,
    },
  ];
};
