import { getAllUsersRecordsCount } from './getAllUsersRecordsCount';

describe('[Service] getAllUsersRecordsCount', () => {
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
  it('should return the correct stats values', () => {
    const actual = getAllUsersRecordsCount(mockedUserRecords);
    const expected = [
      {
        user: 'James',
        count: 2,
      },
      { user: 'Jean-Michel', count: 3 },
      { user: 'Zidane', count: 1 },
    ];
    expect(actual).toEqual(expected);
  });
});
