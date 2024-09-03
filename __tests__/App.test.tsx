import 'react-native';
import React from 'react';
import App from '../App';

import {render, screen} from '@testing-library/react-native';
import * as hooks from '../src/hooks/useLocation';
import * as WeatherHook from '../src/hooks/useWeatherReport';

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

it('should render the App', async () => {
  jest
    .spyOn(hooks, 'useLocation')
    .mockImplementation(() => ({latitude: 10, longitude: 10}));
  jest
    .spyOn(WeatherHook, 'useWeatherReport')
    .mockImplementation(() => dummyWeather);

  render(<App />);
  expect(screen.getByTestId('searchInputTestId')).toBeTruthy();
});
