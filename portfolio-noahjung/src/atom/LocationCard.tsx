import { useLottie } from 'lottie-react';

export interface LocationCardProps {
  city: string;
  ward: string;
  weatherObject: object;
}

const LocationCard = ({
  city: city,
  ward: ward,
  weatherObject: weatherObject,
}: LocationCardProps) => {
  const weatherInfo = {
    animationData: weatherObject,
    loop: true,
    style: { width: '50px', height: '50px' },
  };

  const { View } = useLottie(weatherInfo);

  return (
    <div className={classes.locationContainer}>
      <span className={classes.locationLabel}>Noah's Location</span>
      <div className={classes.locationContentRow}>
        <div className={classes.locationTextStack}>
          <span className={classes.locationCity}>{city}</span>
          <span className={classes.locationSubCity}>{ward}</span>
        </div>
        <div className={classes.lottieWrapper}>{View}</div>
      </div>
    </div>
  );
};

const classes = {
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

export default LocationCard;
