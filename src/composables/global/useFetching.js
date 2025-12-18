import { useQuery } from 'vue-query';
import axios from 'axios';
import Config from 'Config';
import { executeMockRequest } from '@/service/mockService';

export default (queryKeys, address, method = 'get') => {
  return useQuery(
    queryKeys,
    async () => {
      // 尝试使用 mock 数据
      const mockResponse = await executeMockRequest(address, method);
      if (mockResponse) {
        return mockResponse.data;
      }
      
      // 使用真实 API
      return await axios[method](Config.serverUrl + address).then(
        (result) => result.data,
      );
    },
  );
};
