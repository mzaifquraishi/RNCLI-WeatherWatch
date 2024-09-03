import {getTime} from '../getTime';

test('when dateString passed is blank', () => {
  let d = getTime('');
  expect(d).toBe('12 AM');
});

test('when todays DateTime is passed and we get only time', () => {
  let date = new Date().toISOString();
  let d = getTime(date);
  // if d is '12 AM' or '3 AM' or '1 PM'
  expect(d.length).toBeLessThan(6);
});

test('when future DateTime  day is passed and we get date time', () => {
  let date = new Date('10 Mar 2030').toISOString();
  let d = getTime(date);
  expect(d).toBe('10 Mar\n 12 AM');
});
