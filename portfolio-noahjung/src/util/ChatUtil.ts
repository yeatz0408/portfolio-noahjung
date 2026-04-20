import { useLimitStore } from '../store/useStore';

export function checkChatLimit() {
  const HOURLY_LIMIT = 15;
  const DAILY_LIMIT = 30;

  const { aiChatLimits, setLimit } = useLimitStore.getState();
  const { minute, hour, day } = aiChatLimits;
  const now = new Date();

  if (!minute || !hour || !day) {
    const initData = { countFrom: now, count: 1 };
    setLimit('minute', initData);
    setLimit('hour', initData);
    setLimit('day', initData);
    return;
  }

  const isPastDay = now.getDay() !== new Date(day.countFrom).getDay();
  if (day.count >= DAILY_LIMIT && !isPastDay) {
    throw new Error(
      'You have reached the daily message limit. Please try again tomorrow.'
    );
  }

  const isPastHour = now.getHours() !== new Date(hour.countFrom).getHours();
  if (hour.count >= HOURLY_LIMIT && !isPastHour) {
    const howManyMinutes = 60 - now.getMinutes();
    throw new Error(
      `You have reached the hourly message limit. Please try again in ${howManyMinutes} minute${howManyMinutes !== 1 ? 's' : ''}.`
    );
  }

  const isPast20Secs =
    now.getTime() - new Date(minute.countFrom).getTime() > 20000;
  if (!isPast20Secs) {
    throw new Error('Too many messages. Please try in few seconds. ');
  }

  if (isPastDay) {
    setLimit('day', { countFrom: now, count: 1 });
  } else {
    setLimit('day', { countFrom: day.countFrom, count: day.count + 1 });
  }

  if (isPastHour) {
    setLimit('hour', { countFrom: now, count: 1 });
  } else {
    setLimit('hour', { countFrom: hour.countFrom, count: hour.count + 1 });
  }

  // Update Minute
  setLimit('minute', { countFrom: now, count: 1 });
}