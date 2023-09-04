"use client";
import request from "@/requset";
import { Weather } from "@/types/weather";
import { useState } from "react";

export default function QueryWeather(): JSX.Element {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather>()
  const onQuery = async () => {
    if (city) {
      const {data} = await request.get("/weather/get", {
        params: {
          city,
        },
      });
      setWeather(data)
    }
  };
  return (
    <div>
      <div className="flex flex-row mb-3">
        <input
          type="text"
          className="basis-1/2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="button"
          className="basis-1/4 ml-1 py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          onClick={onQuery}
        >
          Query
        </button>
      </div>
      <div className="relative w-full px-4 py-6 bg-white shadow-lg dark:bg-gray-700 rounded">
        <p className="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max dark:text-white">
          Current Weather
        </p>
        <div className="flex items-end my-6 space-x-2">
          <p className="text-5xl font-bold text-black dark:text-white">{weather?.temp}°C</p>
          <span className="flex items-center text-xl font-bold text-green-500">
            <img src={`https://openweathermap.org/img/wn/${weather?.icon || '01d'}.png`} alt=""/>
          </span>
        </div>
        <div className="dark:text-white">
          <div className="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
            <p>Feels Like</p>
            <div className="flex items-end text-xs text-green-500">
              {weather?.feelsLike}°C
            </div>
          </div>
          <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>Humidity</p>
            <div className="flex items-end text-xs text-green-500">
              {weather?.humidity}%rh
            </div>
          </div>
          <div className="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>Pressure</p>
            <div className="flex items-end text-xs text-green-500">
              {weather?.pressure}Pa
            </div>
          </div>
          <div className="flex items-center justify-between pb-2 mb-2 text-sm border-b border-gray-200 sm:space-x-12">
          <p>Wind Speed</p>
            <div className="flex items-end text-xs text-green-500">
              {weather?.windSpeed}m/s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
