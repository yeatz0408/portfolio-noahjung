import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_CONFIG } from '../assets/constant/api';
import { useUIStore } from '../store/useStore';
import LocationCard from '../atom/LocationCard';
import type { LocationCardProps } from '../atom/LocationCard';

import sunny from '../assets/img/weather/sunny_medium.json';
import night from '../assets/img/weather/night.json';
import cloudy from '../assets/img/weather/cloudy.json';
import cloudyDay from '../assets/img/weather/cloudy-day.json';
import cloudyNight from '../assets/img/weather/cloudy-night.json';
import rainyDay from '../assets/img/weather/rainy-day.json';
import rainyNight from '../assets/img/weather/rainy-night.json';
import snowyDay from '../assets/img/weather/snowy-day.json';
import snowyNight from '../assets/img/weather/snowy-night.json';

interface SiteMapInfo {
  uri: string;
  label: string;
}

const NavPane: React.FC = () => {
  const navigate = useNavigate();

  const pageId = useLocation().pathname.replace('/', '');
  const isNavPaneOpen = useUIStore((state) => state.isNavPaneOpen);
  const toggleIsNavPaneOpen = useUIStore((state) => state.toggleIsNavPaneOpen);

  const siteMapInfos: SiteMapInfo[] = [
    {
      uri: '',
      label: 'Home',
    },
    {
      uri: 'career',
      label: 'Career',
    },
    {
      uri: 'workout',
      label: 'Workout',
    },
    {
      uri: 'about',
      label: 'About this site',
    },
  ];

  const handleRouting = (info: SiteMapInfo) => {
    navigate(`/${info.uri}`);
  };

  const [locationCardProps, setLocatinoCardProps] = useState<
    LocationCardProps | undefined
  >(undefined);

  useEffect(() => {
    const loadCard = async () => {
      const gpsRes = await fetch(API_CONFIG.baseUrl + '/gps');
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

      const weatherObject = getWeatherByCode(weatherData.current_weather);

      const locationCardProps = {
        city: city,
        ward: ward,
        weatherObject: weatherObject,
      };

      setLocatinoCardProps(locationCardProps);
    };
    loadCard();
  }, []);

  return (
    <>
      <aside
        className={classes.sidebar}
        style={{ left: isNavPaneOpen ? '0' : '-12rem ' }}
      >
        <button
          onClick={() => toggleIsNavPaneOpen()}
          className={classes.toggleBtn}
        >
          {isNavPaneOpen ? 'close' : 'open'}
        </button>
        <div className={classes.stack}>
          {siteMapInfos &&
            siteMapInfos.map((info, idx) => (
              <button
                onClick={() => handleRouting(info)}
                className={
                  info.uri === pageId ? classes.activeBtn : classes.btn
                }
                key={`${idx}-${info.uri}`}
              >
                {info.label}
              </button>
            ))}
        </div>
        {locationCardProps && (
          <LocationCard
            city={locationCardProps.city}
            ward={locationCardProps.ward}
            weatherObject={locationCardProps.weatherObject}
          />
        )}
      </aside>
    </>
  );
};

const classes = {
  sidebar: `fixed inset-y-0 w-48 bg-sky-50 border-r border-sky-200 p-4 transition-all duration-350 ease-in-out z-50 flex flex-col`,
  stack: 'flex flex-col gap-2',
  btn: 'w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 transition-all hover:bg-sky-200/50 hover:text-sky-800 hover:translate-x-1 cursor-pointer',
  toggleBtn: `absolute left-full top-[10%] h-[15vh] px-3 bg-sky-50 border-y border-r border-sky-200 rounded-r-md text-sm font-medium text-sky-500 hover:text-sky-800 transition-colors cursor-pointer [writing-mode:vertical-rl]`,
  activeBtn:
    'w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-sky-900 bg-sky-100/80 transition-all cursor-default hover:bg-sky-100/80',
};

function getWeatherByCode(weatherData: {
  weathercode: number;
  is_day: number;
}) {
  if (weatherData.weathercode === 0 && weatherData.is_day) {
    return sunny;
  }
  if (weatherData.weathercode === 0 && !weatherData.is_day) {
    return night;
  }
  if (
    weatherData.weathercode >= 61 &&
    weatherData.weathercode <= 63 &&
    weatherData.is_day
  ) {
    return rainyDay;
  }
  if (
    weatherData.weathercode >= 61 &&
    weatherData.weathercode <= 63 &&
    !weatherData.is_day
  ) {
    return rainyNight;
  }
  if (
    weatherData.weathercode >= 71 &&
    weatherData.weathercode <= 75 &&
    weatherData.is_day
  ) {
    return snowyDay;
  }
  if (
    weatherData.weathercode >= 71 &&
    weatherData.weathercode <= 75 &&
    !weatherData.is_day
  ) {
    return snowyNight;
  }
  if (weatherData.weathercode === 3) {
    return cloudy;
  }
  if (!weatherData.is_day) {
    return cloudyNight;
  }
  return cloudyDay;
}

export default NavPane;
