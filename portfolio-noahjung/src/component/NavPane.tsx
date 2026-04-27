import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../store/useStore';
import LocationCard from '../atom/LocationCard';
import useWeather from '../customHook/useWeather';

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
    {
      uri: 'contact',
      label: 'Contact Info',
    },
  ];

  const handleRouting = (info: SiteMapInfo) => {
    navigate(`/${info.uri}`);
  };

  const { data: weatherData } = useWeather();

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
        {weatherData && (
          <LocationCard
            city={weatherData.city}
            ward={weatherData.ward}
            weatherObject={weatherData.weather}
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

export default NavPane;
