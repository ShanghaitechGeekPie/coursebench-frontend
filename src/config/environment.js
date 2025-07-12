// 环境配置
export const ENVIRONMENT = {
  // 开发环境配置
  development: {
    USE_MOCK: true,
    API_BASE_URL: 'http://localhost:3000',
    MOCK_DELAY: 500
  },
  
  // 生产环境配置
  production: {
    USE_MOCK: false,
    API_BASE_URL: 'https://api.coursebench.com',
    MOCK_DELAY: 0
  }
};

// 获取当前环境
export const getCurrentEnv = () => {
  return import.meta.env.MODE === 'production' ? 'production' : 'development';
};

// 获取当前环境配置
export const getEnvConfig = () => {
  return ENVIRONMENT[getCurrentEnv()];
};
