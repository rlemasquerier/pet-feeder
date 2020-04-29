import { getAllUsersRanks, getRankById } from './getRank';

describe('[Service] getAllUsersRecordsCount', () => {
  const mockedUsers = [
    {
      id: '5d9663c54cd54d34075751d4',
      name: 'James',
    },
    {
      id: '5d9663c54cd54d34075751d5',
      name: 'Jean-Michel',
    },
    {
      id: '5d9663c54cd54d34075751d6',
      name: 'Zidane',
    },
    {
      id: '12345',
      name: 'InvisibleMan',
    },
  ];
  const mockedUserRecords = [
    {
      id: '1',
      feederId: '5d9663c54cd54d34075751d4',
      feederName: 'James',
      timestamp: 1,
    },
    {
      id: '2',
      feederId: '5d9663c54cd54d34075751d4',
      feederName: 'James',
      timestamp: 1,
    },
    {
      id: '3',
      feederId: '5d9663c54cd54d34075751d5',
      feederName: 'Jean-Michel',
      timestamp: 1,
    },
    {
      id: '4',
      feederId: '5d9663c54cd54d34075751d5',
      feederName: 'Jean-Michel',
      timestamp: 1,
    },
    {
      id: '5',
      feederId: '5d9663c54cd54d34075751d5',
      feederName: 'Jean-Michel',
      timestamp: 1,
    },
    {
      id: '6',
      feederId: '5d9663c54cd54d34075751d6',
      feederName: 'Zidane',
      timestamp: 1,
    },
  ];
  describe('[Function] getRankById', () => {
    it('should return the correct rank', () => {
      const actual = getRankById(mockedUserRecords, mockedUsers, '5d9663c54cd54d34075751d5');
      const expected = 1;
      expect(actual).toEqual(expected);
    });
    it('should return the correct rank if the user has no records', () => {
      const actual = getRankById(mockedUserRecords, mockedUsers, '12345');
      const expected = 4;
      expect(actual).toEqual(expected);
    });
    it('should return the correct rank if there is only one user with no records', () => {
      const mockedUsers = [
        {
          id: '5d9663c54cd54d34075751d4',
          name: 'James',
        },
      ];
      const records = [];
      const actual = getRankById(records, mockedUsers, '5d9663c54cd54d34075751d4');
      const expected = 1;
      expect(actual).toEqual(expected);
    });
    it('should return a correct rank if there is several users with no records', () => {
      const mockedUsers = [
        {
          id: '5d9663c54cd54d34075751d4',
          name: 'James',
        },
        {
          id: '5d9663c54cd54d34075751d5',
          name: 'Toto',
        },
      ];
      const records = [];
      const actual = getRankById(records, mockedUsers, '5d9663c54cd54d34075751d4');
      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });
  describe('[Function] getUserRanks', () => {
    it('should return the correct ranks values', () => {
      const actual = getAllUsersRanks(mockedUserRecords, mockedUsers);
      const expected = [
        {
          user: 'Jean-Michel',
          userId: '5d9663c54cd54d34075751d5',
          rank: 1,
        },
        { user: 'James', userId: '5d9663c54cd54d34075751d4', rank: 2 },
        { user: 'Zidane', userId: '5d9663c54cd54d34075751d6', rank: 3 },
        { user: 'InvisibleMan', userId: '12345', rank: 4 },
      ];
      expect(actual).toEqual(expected);
    });
  });
});
