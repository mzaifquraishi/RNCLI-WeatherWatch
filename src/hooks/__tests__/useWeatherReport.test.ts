import React, {useState} from 'react';
import {useWeatherReport} from '../useWeatherReport';

const dummyWeather = {
  latitude: 26.875,
  longitude: 81,
  generationtime_ms: 0.030040740966796875,
  utc_offset_seconds: 0,
  timezone: 'GMT',
  timezone_abbreviation: 'GMT',
  elevation: 117,
  current_units: {
    time: 'iso8601',
    interval: 'seconds',
    temperature_2m: 'C',
  },
  current: {
    time: '2024-09-01T18:30',
    interval: 900,
    temperature_2m: 27.6,
  },
  hourly_units: {
    time: 'iso8601',
    temperature_2m: 'C',
    weather_code: 'wmo code',
  },
  hourly: {
    time: ['2024-09-01T00:00', '2024-09-03T17:00'],
    temperature_2m: [28.1, 27.9, 28.3],
    weather_code: [80, 80, 80],
  },
};
// jest.spyOn(React, 'useState').mockImplementation(() => ['', () => {}]);
jest.mock('react', () => ({
  useState: jest.fn().mockImplementation(() => ['', () => {}]),
  useEffect: jest.fn().mockImplementation((a, b) => {
    if (b) {
      a();
    }
  }),
}));

test('shoud reponse null when coords are empty object', () => {
  expect(useWeatherReport(null)).toStrictEqual({error: '', weather: ''});
});

test('shoud reponse not null when coords are not null', () => {
    jest.spyOn(React, 'useState').mockImplementation(() => [dummyWeather, () => {}]);
  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() =>
      Promise.resolve({json: () => Promise.resolve(dummyWeather)}),
    );

  expect(useWeatherReport({latitude: 25.0, longitude: 80.0})).toStrictEqual({
    error: dummyWeather,
    weather: dummyWeather,
  });
});

test('shoud reponse not null when coords are not null', () => {
    jest.spyOn(React, 'useState').mockImplementation(() => ['Error', () => {}]);
  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.reject(new Error('Error')));

  expect(useWeatherReport({latitude: 25.0, longitude: 80.0})).toStrictEqual({
    error: 'Error',
    weather: 'Error',
  });
});
