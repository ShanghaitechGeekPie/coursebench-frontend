import { 
  USE_MOCK_DATA, 
  testCommentText, 
  testCourseData, 
  testTeacherData,
  testUserProfile 
} from './usePhantomData';

export const mockManager = {
  // 检查是否使用mock数据
  shouldUseMock: () => USE_MOCK_DATA,
  
  // 模拟API延迟
  mockDelay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // 模拟成功响应
  mockSuccess: async (data, delay = 500) => {
    if (!USE_MOCK_DATA) return null;
    await mockManager.mockDelay(delay);
    return { data: { data } };
  },
  
  // 模拟错误响应
  mockError: async (message = '模拟错误', delay = 500) => {
    if (!USE_MOCK_DATA) return null;
    await mockManager.mockDelay(delay);
    throw new Error(message);
  },
  
  // 获取mock数据
  getMockData: (type) => {
    const mockDataMap = {
      comments: testCommentText,
      courses: testCourseData,
      teachers: testTeacherData,
      userProfile: testUserProfile
    };
    return mockDataMap[type] || [];
  }
};

export default mockManager;
