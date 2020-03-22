import { getAllUsersRecordsCount, getUserRecordsCountById } from './getAllUsersRecordsCount';

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
  describe('[Function] getUserRecordsCountById', () => {
    it('should return the correct count if the user has records', () => {
      const actual = getUserRecordsCountById(mockedUserRecords, '5d9663c54cd54d34075751d5');
      const expected = 3;
      expect(actual).toEqual(expected);
    });
    it('should return the correct count if the user has no records', () => {
      const actual = getUserRecordsCountById(mockedUserRecords, '12345');
      const expected = 0;
      expect(actual).toEqual(expected);
    });
  });
  describe('[Function] getAllUsersRecordsCount', () => {
    it('should return the correct stats values', () => {
      const actual = getAllUsersRecordsCount(mockedUserRecords, mockedUsers);
      const expected = [
        {
          user: 'James',
          count: 2,
        },
        { user: 'Jean-Michel', count: 3 },
        { user: 'Zidane', count: 1 },
        { user: 'InvisibleMan', count: 0 },
      ];
      expect(actual).toEqual(expected);
    });
  });
});
