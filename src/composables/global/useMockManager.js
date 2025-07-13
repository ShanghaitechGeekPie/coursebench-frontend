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
  
 
  mockSuccess: async (data) => {
    if (!USE_MOCK_DATA) return null;
    return { data: { data } };
  },
  
  // 模拟错误响应
  mockError: async (message = '模拟错误') => {
    if (!USE_MOCK_DATA) return null;
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
