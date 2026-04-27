
import { useEffect, useState } from 'react';
import { API_CONFIG } from '../assets/constant/api';

import { HOME_CITY, HOME_WARD } from '../assets/constant/PersonalInfo';

import sunny from '../assets/img/weather/sunny_medium.json';
import night from '../assets/img/weather/night.json';
import cloudy from '../assets/img/weather/cloudy.json';
import cloudyDay from '../assets/img/weather/cloudy-day.json';
import rainyDay from '../assets/img/weather/rainy-day.json';
import rainyNight from '../assets/img/weather/rainy-night.json';
import snowyDay from '../assets/img/weather/snowy-day.json';
import snowyNight from '../assets/img/weather/snowy-night.json';
import { useLocationStore } from '../store/useStore';

interface WeatherEntry {
  day: object;
  night: object;
}

const weatherMap: Record<number, WeatherEntry> = {
  0: {day: sunny, night: night},
  3: {day: cloudy, night: cloudy},
  61: {day: rainyDay, night: rainyNight},
  62: {day: rainyDay, night: rainyNight},
  63: {day: rainyDay, night: rainyNight},
  71: {day: snowyDay, night: snowyNight},
  72: {day: snowyDay, night: snowyNight},
  73: {day: snowyDay, night: snowyNight},
  74: {day: snowyDay, night: snowyNight},
  75: {day: snowyDay, night: snowyNight},
}

const useWeather = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<{
    city: string;
    ward: string;
    weather: object;
  } | null>(null);

  const setCity = useLocationStore((state) => state.setCity);
  const setWard = useLocationStore((state) => state.setWard);
  

  useEffect(() => {
    let isActive = true;

    const loadCard = async () => {
      try {
        setIsLoading(true);

        const gpsRes = await fetch(API_CONFIG.baseUrl + '/v1/gps/gps');
        const gpsData = await gpsRes.json();

        const latitude = gpsData.latitude ? gpsData.latitude : 35.698;
        const longitude = gpsData.longitude ? gpsData.longitude : 139.6806;

        const [weatherRes, areaRes] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          ),
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
          ),
        ]);

        const [weatherData, areaData] = await Promise.all([
          weatherRes.json(),
          areaRes.json(),
        ]);

        const city =
          areaData.address['ISO3166-2-lvl4'] === 'JP-13'
            ? 'Tokyo'
            : areaData.address.city;
        const ward =
          areaData.address['ISO3166-2-lvl4'] === 'JP-13'
            ? areaData.address.city
            : areaData.address.neighbourhood.split(' ')[0];

        setCity(city);
        setWard(ward);

        const match = weatherMap[weatherData.current_weather.weathercode] ?? weatherMap[3];
        const weatherObject = weatherData.current_weather.is_day ? match?.day : match?.night;

        if (isActive) {
            setData({ city: city, ward: ward, weather: weatherObject });
        }
      } catch (e) {
        if (isActive) {
            setData({ city: HOME_CITY, ward: HOME_WARD, weather: cloudyDay });
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadCard();

    return () => {
        isActive = false;
    }
  }, []);

  return {isLoading, data}
}

export default useWeather;