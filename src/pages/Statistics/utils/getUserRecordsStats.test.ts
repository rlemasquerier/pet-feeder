import { getUserRecordsStats } from './getUserRecordsStats';

describe('[Service] getUserRecordsStats', () => {
  const mockedUserRecords = [
    {
      id: '5d9664124cd54d34075751d5',
      feederId: '5d9663c54cd54d34075751d4',
      feederName: 'James',
      timestamp: 1570137106023,
    },
    {
      id: '5d97a49ee24c799c33bd526b',
      feederId: '5d9663c54cd54d34075751d4',
      feederName: 'James',
      timestamp: 1570219166919,
    },
  ];
  it('should return the correct stats values', () => {
    const actual = getUserRecordsStats(mockedUserRecords);
    const expected = [
      {
        label: 'Repas',
        value: 2,
      },
      { label: 'Matins', value: 0 },
      { label: 'Soirs', value: 2 },
    ];
    expect(actual).toEqual(expected);
  });
  it('should return the correct stats values if the list is empty', () => {
    const actual = getUserRecordsStats([]);
    const expected = [
      {
        label: 'Repas',
        value: 0,
      },
      { label: 'Matins', value: 0 },
      { label: 'Soirs', value: 0 },
    ];
    expect(actual).toEqual(expected);
  });
  it('should return the correct stats values if the list is undefined', () => {
    const actual = getUserRecordsStats(undefined);
    const expected = [
      {
        label: 'Repas',
        value: 0,
      },
      { label: 'Matins', value: 0 },
      { label: 'Soirs', value: 0 },
    ];
    expect(actual).toEqual(expected);
  });
});
