import moment, { Moment } from 'moment';

// https://stackoverflow.com/questions/35441820/moment-js-tomorrow-today-and-yesterday

export const dateToFromNowDaily = (myDate: Moment): string => {
  // get from-now for this date
  var fromNow = moment(myDate).fromNow();

  // ensure the date is displayed with today and yesterday
  return moment(myDate).calendar(undefined, {
    // when the date is closer, specify custom values
    lastWeek: 'dddd [dernier]',
    lastDay: '[Hier]',
    sameDay: "[Aujourd'hui]",
    nextDay: '[Demain]',
    nextWeek: 'dddd',
    // when the date is further away, use from-now functionality
    sameElse: function() {
      return '[' + fromNow + ']';
    },
  });
};
