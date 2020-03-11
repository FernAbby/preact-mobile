import axios from 'axios';
import { baseUrl } from '../config/index';
// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // base_url of api
  timeout: 10000 // request timeout
});

const err = (error) => {
  return Promise.reject(error);
};

service.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  return config;
}, err);

service.interceptors.response.use(response => response, err);

function fetch(options) {
  return new Promise((resolve, reject) => {
    const { url, method, data } = options;
    const config = {
      url,
      method: method || 'GET',
      data,
      withCredentials: true
    };
    service(config).then(
      (res) => {
        const { data } = res;
        if (data.success) {
          resolve(data.data ? data.data : data);
        } else {
          reject(data);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export default fetch;
