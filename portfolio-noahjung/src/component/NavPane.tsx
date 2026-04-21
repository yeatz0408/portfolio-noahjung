import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../store/useStore';

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
        <LocationCard />
      </aside>
    </>
  );
};

import sunny from '../assets/img/weather/sunny_medium.json';
import night from '../assets/img/weather/night.json';
import cloudy from '../assets/img/weather/cloudy.json';
import cloudyDay from '../assets/img/weather/cloudy-day.json';
import cloudyNight from '../assets/img/weather/cloudy-night.json';
import rainyDay from '../assets/img/weather/rainy-day.json';
import rainyNight from '../assets/img/weather/rainy-night.json';
import snowyDay from '../assets/img/weather/snowy-day.json';
import snowyNight from '../assets/img/weather/snowy-night.json';

import { useLottie } from 'lottie-react';

const LocationCard = () => {
  const options = {
    animationData: sunny,
    loop: true,
    style: { width: '50px', height: '50px' },
  };

  const { View } = useLottie(options);

  return (
    <div className={classes.locationContainer}>
      <span className={classes.locationLabel}>Noah's Location</span>

      {/* This new row holds the text column on the left, and the icon on the right */}
      <div className={classes.locationContentRow}>
        {/* The text stack holding Tokyo and Nakano */}
        <div className={classes.locationTextStack}>
          <span className={classes.locationCity}>Tokyo,</span>
          <span className={classes.locationSubCity}>Nakano</span>
        </div>

        {/* The icon */}
        <div className={classes.lottieWrapper}>{View}</div>
      </div>
    </div>
  );
};

const classes = {
  sidebar: `fixed inset-y-0 w-48 bg-sky-50 border-r border-sky-200 p-4 transition-all duration-350 ease-in-out z-50 flex flex-col`,
  stack: 'flex flex-col gap-2',
  btn: 'w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 transition-all hover:bg-sky-200/50 hover:text-sky-800 hover:translate-x-1 cursor-pointer',
  toggleBtn: `absolute left-full top-[10%] h-[15vh] px-3 bg-sky-50 border-y border-r border-sky-200 rounded-r-md text-sm font-medium text-sky-500 hover:text-sky-800 transition-colors cursor-pointer [writing-mode:vertical-rl]`,
  activeBtn:
    'w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-sky-900 bg-sky-100/80 transition-all cursor-default hover:bg-sky-100/80',

  locationContainer:
    'mt-auto flex flex-col p-4 bg-white rounded-xl shadow-sm border border-sky-100',
  locationLabel:
    'w-full text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2',
  locationContentRow: 'flex justify-between items-center w-full',
  locationTextStack: 'flex flex-col items-start',
  locationCity: 'text-left text-xl font-extrabold text-sky-900 leading-none',
  locationSubCity: 'text-left text-sm font-medium text-slate-500 mt-0.5',
  lottieWrapper: 'drop-shadow-sm shrink-0',
};
export default NavPane;
