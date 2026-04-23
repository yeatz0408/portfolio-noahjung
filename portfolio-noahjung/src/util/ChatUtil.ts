import { useLimitStore } from '../store/useStore';

export class QuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotaError';
  }
}

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

  const isPastDay = now.toDateString() !== new Date(day.countFrom).toDateString();
  if (day.count >= DAILY_LIMIT && !isPastDay) {
    throw new QuotaError(
      'You have reached the daily message limit. Please try again tomorrow.'
    );
  }

  const isPastHour = isPastDay || now.getHours() !== new Date(hour.countFrom).getHours();
  if (hour.count >= HOURLY_LIMIT && !isPastHour) {
    const howManyMinutes = 60 - now.getMinutes();
    throw new QuotaError(
      `You have reached the hourly message limit. Please try again in ${howManyMinutes} minute${howManyMinutes !== 1 ? 's' : ''}.`
    );
  }

  const isPast20Secs = 
    now.getTime() - new Date(minute.countFrom).getTime() > 20000;
  if (!isPast20Secs) {
    throw new QuotaError('Too many messages. Please try in a few seconds.');
  }

  setLimit('day', isPastDay ? { countFrom: now, count: 1 } : { countFrom: day.countFrom, count: day.count + 1 });
  setLimit('hour', isPastHour ? { countFrom: now, count: 1 } : { countFrom: hour.countFrom, count: hour.count + 1 });
  setLimit('minute', { countFrom: now, count: 1 });
}

export function refundQuota() {
  const { aiChatLimits, setLimit } = useLimitStore.getState();
  const { hour, day } = aiChatLimits;

  if (!hour || !day) return;

  setLimit('day', { countFrom: day.countFrom, count: Math.max(0, day.count - 1) });
  setLimit('hour', { countFrom: hour.countFrom, count: Math.max(0, hour.count - 1) });
}