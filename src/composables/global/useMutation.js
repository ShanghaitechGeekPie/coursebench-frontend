import { useMutation as useVueMutation } from 'vue-query';
import axios from 'axios';
import Config from 'Config';
import { executeMockRequest } from '@/service/mockService';

export default (address, options = {}, axiosConfig = {}) => {
  return useVueMutation(
    async (data) => {
      const method = axiosConfig.method || 'post';

      // 尝试使用 mock 数据
      const mockResponse = await executeMockRequest(address, method, data);
      if (mockResponse) {
        return mockResponse;
      }

      // 使用真实 API
      return await axios({
        method,
        url: Config.serverUrl + address,
        data,
        ...axiosConfig,
      });
    },
    options,
  );
};
