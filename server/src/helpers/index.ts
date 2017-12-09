import axios from 'axios';

export const get = function (url: string, config?: object) {
  return axios['get'](url, config);
};
