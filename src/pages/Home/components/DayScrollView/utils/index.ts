import { Record } from 'pet-feeder/src/types';

export const arrangeRecords = (morningRecords: Record[], eveningRecords: Record[]) => {
  return {
    food: {
      morning: morningRecords.filter((record: Record) => record.type === 'food'),
      evening: eveningRecords.filter((record: Record) => record.type === 'food'),
    },
    others: [
      ...morningRecords.filter((record: Record) => record.type !== 'food'),
      ...eveningRecords.filter((record: Record) => record.type !== 'food'),
    ],
  };
};
