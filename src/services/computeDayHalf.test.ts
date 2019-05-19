import moment from 'moment';
import { computeDayHalf } from './computeDayHalf';

describe('[Service] Compute day half', () => {
  it('should return morning if it is the morning', () => {
    const date = moment('08/04/2004 07:55:33', 'DD/MM/YYY hh:mm:ss');
    expect(computeDayHalf(date)).toEqual('morning');
  });
  it('should return evening if it is the evening', () => {
    const date = moment('08/04/2004 15:55:33', 'DD/MM/YYY hh:mm:ss');
    expect(computeDayHalf(date)).toEqual('evening');
  });
});
