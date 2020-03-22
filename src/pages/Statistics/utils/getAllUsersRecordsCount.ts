import { Record, User } from 'pet-feeder/src/types';

export const getAllUsersRecordsCount = (records: Record[], users: User[]) => {
  return users.map((user: User) => {
    return {
      user: user.name,
      count: getUserRecordsCountById(records, user.id),
    };
  });
};

export const getUserRecordsCountById = (records: Record[], userId: string) => {
  return records.filter(record => record.feederId === userId).length;
};
