import React, { useEffect, useState } from 'react'
import { getForecastByCity } from '../services/DailyForcast'

function Daily({ city }) {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const data = await getForecastByCity(city);
                setForecastData(data.list);
            } catch (error) {
                console.error('Error fetching forecast:', error);
            }
        };

        fetchForecast();
    }, [city]);

    console.log(forecastData, "foracaseettt dataa");
    return (
        <div className='absolute backdrop-blur-sm bg-gray-700/50 bottom-8 right-12 h-[43%] mt-8 w-[55%] rounded-2xl'>
            <div className='mt-4 flex flex-col gap-2'>
                {forecastData.map((forecast, index) => (
                    <React.Fragment key={index}>
                        <span className='ml-6 font-bold text-white hover:text-blue-300 flex justify-between'>
                            <span>{new Date(forecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' })}</span>
                            <span className='mr-2'>{forecast.weather[0]?.description} {forecast.main?.temp}°c</span>
                        </span>
                        {index < 6 && <hr className='w-[97%] ml-4' />}
                    </React.Fragment>
                ))}
            </div>
        </div>

    )
}

export default Daily
