import { useQuery } from 'vue-query';
import axios from 'axios';
import Config from 'Config';
import mockManager from './useMockManager';

export default (queryKeys, address, method = 'get') => {
  return useQuery(
    queryKeys,
    async () => {
      // mock数据
      if (mockManager.shouldUseMock()) {
        if (address.includes('/comment/recent')) {
          return await mockManager.mockSuccess(mockManager.getMockData('comments'));
        } else if (address.includes('/course/all')) {
          return await mockManager.mockSuccess(mockManager.getMockData('courses'));
        } else if (address.includes('/teacher/')) {
          return await mockManager.mockSuccess(mockManager.getMockData('teachers')[0]);
        }
        // 默认返回空数据
        return await mockManager.mockSuccess([]);
      }
      

      return await axios[method](Config.serverUrl + address).then(
        (result) => result.data,
      );
    },
  );
};
