import {useEffect, useState} from 'react';
import {Coordinates} from '../helpers/getWeatherImage';

const useWeatherReport = (coords: Coordinates | null) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    async function fetchdata() {
      if (!coords) {
        return;
      }
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m&hourly=temperature_2m,weather_code`,
      );
      const data = await response.json();
      setWeather({
        ...data,
        // expired: Date.now() + data.current.interval,
        city: coords.city,
      });
    }
    fetchdata();
    return () => {};
  }, [coords]);
  return weather;
};

export  {useWeatherReport};
