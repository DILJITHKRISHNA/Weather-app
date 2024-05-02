import React, { useEffect, useState } from 'react';
import { getForecastByCity } from '../services/DailyForcast';
import { TiWeatherCloudy } from "react-icons/ti";

const WeatherForecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);
  const [weekday, setWeekday] = useState("");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getForecastByCity(city);
        setForecastData(data.list);
        console.log(data, "Forecast data fetched");
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }, [city]);

  const weekdayName = new Date().toLocaleDateString('en-GB', { weekday: 'long' });


  const firstForecast = forecastData.length > 0 ? forecastData[0] : null;
  const weatherDescription = firstForecast?.weather?.[0]?.description ?? 'No description available';
  const pressure = firstForecast?.main?.pressure ?? 'N/A';
  const windSpeed = firstForecast?.wind?.speed ?? 'N/A';
  const humidity = firstForecast?.main?.humidity ?? 'N/A';
  // useEffect(() => {
  //   if (forecastData && forecastData.list.dt_txt) { // Check if `dt_txt` exists
  //     const date = new Date(forecastData.dt_txt);
  
  //     if (!isNaN(date.getTime())) { // Ensure the `Date` object is valid
  //       const weekdayName = date.toLocaleDateString("en-GB", { weekday: "long" });
  //       setWeekday(weekdayName); // Set the weekday
  //     } else {
  //       console.error("Invalid date from dt_txt"); // Handle invalid dates
  //     }
  //   } else {
  //     console.warn("`forecastData` or `dt_txt` is missing"); // Handle missing data
  //   }
  // }, [forecastData]); // Ensure the effect runs when `forecastData` changes
  // console.log(weekday,"weekdayyy");
  return (
    <div>
      <div className="mt-8 flex flex-col gap-2">
        <React.Fragment>
          <span className="ml-6 font-bold text-white hover:text-blue-300 flex justify-between">
            <span>{weekdayName}</span> 
            {/* need to take the day from the forcastData state inside dt_txt */}
            <span className="mr-2 flex flex-row gap-2 items-center"><TiWeatherCloudy className='w-8 h-8' />{weatherDescription}</span>
          </span>
        </React.Fragment>
      </div>

      <div className="absolute backdrop-blur-sm bg-gray-700/50 top-8 left-12 h-[63%] mt-8 w-[80%] rounded-2xl">
        <div className="mt-10 flex flex-col gap-2">
          <React.Fragment>
            <span className="ml-6 font-bold text-white hover:text-blue-300 flex justify-between">
              <span>Pressure: {pressure}</span>
              <span>Wind Speed: {windSpeed} m/s</span>
              <span>Humidity: {humidity}%</span>
            </span>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
