import * as DB from '../mongodb';

export function find (params: object, col: string, config: object) {
  return DB
    .read(params, col, config)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
export function change (params: string, col: string, config: object) {
  return DB
    .update(params, col, config)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
export function make (params: object, col: string, config: object) {
  return DB
    .create(params, col, config)
    .then((doc) => {
      return doc.ops[0];
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function findAll (params: object, col: string) {
  return DB
    .readAll(params, col)
    .then((docs) => {
      return docs;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function remove (params: string, col: string) {
  return DB
    .destroy(params, col)
    .then((doc) => {
      return doc.value;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
