import { Record } from 'pet-feeder/src/types';

export const getAllUsersRecordsCount = (records: Record[]) => {
  const normalizedRecords = normalizeRecords(records);
  return Object.keys(normalizedRecords).map(userId => ({
    user: normalizedRecords[userId].feederName,
    count: normalizedRecords[userId].records.length,
  }));
};

interface NormalizedRecords {
  [userId: string]: { feederName: string; records: Record[] };
}

// Normalize by user id

const normalizeRecords = (records: Record[]): NormalizedRecords => {
  const normalizedRecords: NormalizedRecords = {};
  records.forEach(record => {
    if (normalizedRecords[record.feederId]) {
      normalizedRecords[record.feederId].records.push(record);
    } else {
      normalizedRecords[record.feederId] = { feederName: record.feederName, records: [record] };
    }
  });
  return normalizedRecords;
};
