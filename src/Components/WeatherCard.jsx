import React, { useEffect, useState } from 'react';
import { getWeatherByCity } from '../services/weatherService';

const WeatherCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

useEffect(() => {
  const fetchWeather = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data); 
      console.log(data,"weather dataaaaa");
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherData(null); 
    }
  };

  fetchWeather();
}, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='hover:bg-slate-900 p-2 rounded-lg flex flex-col gap-4 '>
      <h2 className='text-2xl'>{city}</h2>
      <p>Temperature:{weatherData.main.temp}°C</p>
      <p>Weather:<span className='font-mono'>{weatherData.weather[0].description}</span></p>
    </div>
  );
};

export default WeatherCard;
