import React, { useEffect, useState } from 'react'
import BackGroundImg from '../assets/img/weatherBG.jpg'
import cloud from '../assets/img/cloud.png'
import { TiWeatherDownpour } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import Sidebar from '../Components/Sidebar.jsx';
import Daily from './Daily.jsx';
import WeatherForecast from './WeatherForecast.jsx';
import { TiWeatherPartlySunny } from "react-icons/ti"
import WeatherCard from '../Components/WeatherCard.jsx';
import { getWeatherByCity } from '../services/weatherService.js';


function Home() {

    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('kerala');
    const [search, setSearch] = useState(null)

    const handleSearch = () => {
        if (search) {
            setCity(search.trim());
        }
    };

    const [cityData, setCityData] = useState([]);

    useEffect(() => {
        const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad'];
        const fetchCityData = async () => {
            const cityWeatherData = [];
            for (const city of cities) {
                try {
                    const data = await getWeatherByCity(city);
                    cityWeatherData.push({ city, temp: data.main.temp });
                } catch (error) {
                    console.error(`Error fetching weather for ${city}:`, error);
                }
            }
            setCityData(cityWeatherData);
        };

        fetchCityData();
    }, []);

    const sortedCityData = cityData.sort((a, b) => b.temp - a.temp);

    const topFourCities = sortedCityData.slice(0, 4);


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (city) {
                    const data = await getWeatherByCity(city);
                    setWeatherData(data);
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
                setWeatherData(null);
            }
        };

        fetchWeather();
    }, [city]);

    const currentDate = new Date();

    const dateString = currentDate instanceof Date
        ? currentDate.toLocaleDateString()
        : 'Invalid Date';

    const now = new Date();
    const timeString = now.toLocaleTimeString();

    return (
        <>
            <div className="h-screen relative flex items-center justify-center">
                <div className="w-full h-full">
                    <img
                        src={BackGroundImg}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                    <Sidebar />
                    <div className='absolute backdrop-blur-sm bg-gray-700/50 top-2 right-[60%] h-[40%] mt-8 w-[30%] rounded-2xl'>
                        <div className='flex flex-row'>
                            <img src={cloud} alt="" className='w-[48%] h-[56%] mt-2 ' />
                            <div className='flex flex-col mt-6 text-lg'>
                                <span className='ml-16 text-white font-mono'>Time: {timeString}</span>
                                <span className='ml-16 text-white font-mono'>Date: {dateString}</span>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold text-white ml-11 text-lg'>{weatherData?.name}</span>
                            {!weatherData ? (
                                <div className='font-bold text-4xl text-white ml-10'>Loading...</div>
                            ) : (
                                <span className='font-bold text-6xl text-white ml-10 '>{weatherData.main?.temp}°c</span>
                            )}

                        </div>
                        <div className='flex flex-row gap-2'>
                            <TiWeatherDownpour className='w-6 h-6 ml-10 text-white font-bold' />
                            <span className='font-bold text-white mb-2'>{weatherData?.weather[0]?.description}</span>
                        </div>
                    </div>
                    <span className='absolute top-[47%] left-[11%] font-bold text-white'>Other Details</span>
                    <div className='absolute backdrop-blur-sm bg-gray-700/50 top-2 right-12 h-[40%] mt-8 w-[55%] rounded-2xl'>
                        <span className='ml-4 font-bold text-white flex flex-row gap-2 items-center'>
                            <TiWeatherPartlySunny className='w-12 h-12' />Location-Based Weather
                        </span>

                        <div className='mt-8 flex gap-3 flex-row text-white font-bold ml-4 cursor-pointer'>
                            {topFourCities.map((city, index) => (
                                <WeatherCard key={index} city={city.city} temp={city.temp} />
                            ))}
                        </div>

                        <span className='absolute top-2 right-12 bg-transparent flex items-center'>
                            <input
                                type="search"
                                className='bg-gray-700 backdrop-blur-lg h-8 w-full rounded-2xl p-3 text-white'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <FaSearch onClick={handleSearch} type='submit' className='absolute z-10 ml-[84%] bg-transparent text-xl text-white' />
                        </span>
                    </div>
                    <div className='absolute backdrop-blur-sm bg-gray-700/50 bottom-8 right-[60%] h-[43%] mt-8 w-[30%] rounded-2xl'>
                        <WeatherForecast city={city} />
                    </div>
                    <span className='absolute top-[47%] left-[43%] font-bold text-white'>7 days forcast</span>

                    <Daily city={city} />

                </div>
            </div>
        </>
    )
}

export default Home
