export const ENVIRONMENT = {
  development: {
    USE_MOCK: true,
    API_BASE_URL: 'http://localhost:3000',
    MOCK_DELAY: 0
  },

  production: {
    USE_MOCK: false,
    API_BASE_URL: 'https://api.coursebench.com',
    MOCK_DELAY: 0
  }
};

export const getCurrentEnv = () => {
  console.log('Current environment:', process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

export const getEnvConfig = () => {
  return ENVIRONMENT[getCurrentEnv()];
};

export const USE_MOCK_DATA = getEnvConfig().USE_MOCK;

