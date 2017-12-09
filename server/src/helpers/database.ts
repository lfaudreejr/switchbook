import * as mongo from '../mongodb';

export function find (params: object, col: string, config: object) {
  return mongo
    .read(params, col, config)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
export function change (params: string, col: string, config: object) {
  return mongo
    .update(params, col, config)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
export function make (params: object, col: string, config: object) {
  return mongo
    .create(params, col, config)
    .then((doc) => {
      return doc.ops[0];
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function findAll (params: object, col: string) {
  return mongo
    .readAll(params, col)
    .then((docs) => {
      return docs;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function remove (params: string, col: string) {
  return mongo
    .destroy(params, col)
    .then((doc) => {
      return doc.value;
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}
