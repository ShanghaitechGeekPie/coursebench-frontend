import { useMutation } from 'vue-query';
import axios from 'axios';
import Config from 'Config';

export default (address, options, axiosConfig = undefined) =>
  useMutation(
    (mutationValue) =>
      axios.post(Config.serverUrl + address, mutationValue, axiosConfig),
    options,
  );
