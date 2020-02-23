import { Record } from 'pet-feeder/src/types';
import { MORNING, EVENING } from 'pet-feeder/src/services/computeDayHalf';

export const arrangeRecords = (morningRecords: Record[], eveningRecords: Record[]) => {
  return {
    food: {
      [MORNING]: morningRecords.filter((record: Record) => record.type === 'food'),
      [EVENING]: eveningRecords.filter((record: Record) => record.type === 'food'),
    },
    others: [
      ...morningRecords.filter((record: Record) => record.type !== 'food'),
      ...eveningRecords.filter((record: Record) => record.type !== 'food'),
    ],
  };
};
