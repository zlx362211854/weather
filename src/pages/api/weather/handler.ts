import axios from "axios";
import { NextApiRequest } from "next";
import { COODINATE_URL, QUERY_WEATHER_URL } from "@/constants/urls";
import { Coodinate, Weather } from "@/types/weather";

const appid = process.env.appid;

export async function getCoodinate(req: NextApiRequest): Promise<Coodinate> {
  const { city } = req.query;
  const coordinates = await axios.get(
    `${COODINATE_URL}?q=${city}&appid=${appid}`
  );
  const { data } = coordinates;
  if (data && Array.isArray(data) && data.length !== 0) {
    const { lat, lon } = data[0];
    return { lat, lon };
  } else {
    throw `Can not find coodinate by city ${city}, please check if city name is correct`;
  }
}


export async function getWeatherByCoodinate(coodinate: Coodinate): Promise<Weather> {
    const {lat, lon} = coodinate
    const {data} = await axios.get(`${QUERY_WEATHER_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`)
    if (data) {
      const { main, weather, wind } = data;
      const { description, icon } = weather?.[0];
      return {
        temp: main.temp,
        feelsLike: main.feels_like,
        humidity: main.humidity,
        pressure: main.pressure,
        windSpeed: wind.speed,
        description,
        icon,
      };
    } else {
        throw `Can not get weather by coodinate lat: ${lat}, lon: ${lon}, please check if coodinate is correct`
    }
}