const rawBaseUrl = import.meta.env.VITE_SERVER_SIDE_API_BASE_URL?.replace(/\/$/, '');
const resolveBaseUrl = () => {
  if (!rawBaseUrl) {
    return '/api';
  }

  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && rawBaseUrl.startsWith('http://')) {
    return '/api';
  }

  return rawBaseUrl;
};

export const API_CONFIG = {
    baseUrl: resolveBaseUrl(),
    timeout: 30000,
};