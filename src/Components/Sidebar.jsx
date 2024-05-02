import React from 'react'
import logo from '../assets/Logo/WeatherLogo.png'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherNight } from "react-icons/ti";

function Sidebar() {
    return (
        <div className='absolute backdrop-blur-sm bg-gray-700/50 top-2 left-5 h-[90%] mt-8 w-[6%] rounded-2xl'>
            <div className='flex justify-center items-center flex-col'>
                <img src={logo} alt="" className='w-12 h-12' />
                <span className='text-white font-bold font-mono'>Weathry</span>
                <div className="flex flex-col justify-center items-center gap-10">
                    <div className="flex border-b-2 w-20 border-gray-600"></div>
                    <TiWeatherDownpour className="w-10 h-12 text-white transform transition-transform duration-500 hover:scale-110 cursor-pointer" />
                    <TiWeatherNight className="w-10 h-12 text-white transform transition-transform duration-500 hover:scale-110 cursor-pointer" />
                    <TiWeatherPartlySunny className="w-10 h-12 text-white transform transition-transform duration-500 hover:scale-110 cursor-pointer" />
                    <TiWeatherStormy className="w-10 h-12 text-white transform transition-transform duration-500 hover:scale-110 cursor-pointer" />
                    <TiWeatherSunny className="w-10 h-12 text-white transform transition-transform duration-500 hover:scale-110 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
