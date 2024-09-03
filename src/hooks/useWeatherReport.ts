import {useEffect, useState} from 'react';
import {Coordinates} from '../helpers/getWeatherImage';

const useWeatherReport = (coords: Coordinates | null) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!coords) {
      return;
    }
    fetchdata();
    return () => {};
  }, [coords]);

  function fetchdata() {
    try {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m&hourly=temperature_2m,weather_code`,
      )
        .then(d => d.json())
        .then(data => {
          setWeather({
            ...data,
            // expired: Date.now() + data.current.interval,
            city: coords.city,
          });
        })
        .catch(error => {
          setError(error);
        });
    } catch (error) {
      setError(new Error('Failed to fetch data'));
    }
  }
  return {weather, error};
};

export {useWeatherReport};
