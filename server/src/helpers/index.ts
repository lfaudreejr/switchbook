import axios from 'axios';
import * as mongo from '../mongodb';

export const get = function (url: string) {
  return axios['get'](url);
};

function find (params: any, col: string) {
  return mongo
    .read(params, col)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
function change (params: any, col: string, config: object) {
  return mongo
    .update(params, col, config)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
function make (params: any, col: string, config: object) {
  return mongo
    .create(params, col, config)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
