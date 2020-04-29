import { Record, User } from 'pet-feeder/src/types';
import { getAllUsersRecordsCount } from '.';
import orderBy from 'lodash/orderBy';

export const getAllUsersRanks = (records: Record[], users: User[]) => {
  const counts = getAllUsersRecordsCount(records, users);
  return orderBy(counts, ['count'], ['desc']).map((val, index) => ({
    rank: index + 1,
    user: val.user,
    userId: val.userId,
  }));
};

export const getRankById = (records: Record[], users: User[], userId: string) => {
  return getAllUsersRanks(records, users).filter(val => val.userId === userId)[0].rank;
};
