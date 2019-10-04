import moment from 'moment';
import { computeDayHalf, MORNING, EVENING } from '../../../services';
import { Record } from '../../../types';

export const getUserRecordsStats = (recordsList: Record[] | undefined) => {
  const sanitizedList = recordsList || [];
  return [
    { label: 'Repas', value: sanitizedList.length },
    {
      label: 'Matins',
      value: sanitizedList.filter(
        (record: Record) => computeDayHalf(moment(record.timestamp)) === MORNING
      ).length,
    },
    {
      label: 'Soirs',
      value: sanitizedList.filter(
        (record: Record) => computeDayHalf(moment(record.timestamp)) === EVENING
      ).length,
    },
  ];
};
