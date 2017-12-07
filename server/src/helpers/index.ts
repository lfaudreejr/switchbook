import axios from 'axios';

export const get = function (url: string) {
  return axios['get'](url);
};
