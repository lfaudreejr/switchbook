import * as mongodb from 'mongodb';
import { config } from '../config';

const MongoClient = mongodb.MongoClient;

/**
 * Mongo State
 */
let mongoUri: string;
let _db: mongodb.Db;

/**
 * Mongo Db connection
 */
export function connectDB (): Promise<mongodb.Db> {
  /**
   * Handle mongo uri per environment
   */
  if (config.NODE_ENV !== 'production') {
    mongoUri = config.MONGO_DEV_URI;
  } else {
    mongoUri = config.MONGO_PROD_URI;
  }

  return new Promise((resolve, reject) => {
    if (_db) return resolve(_db);

    MongoClient.connect(mongoUri, (err: Error, db: mongodb.Db) => {
      if (err) return reject(err);
      _db = db;
      return resolve(_db);
    });
  });
}
/**
 * Close DB connection
 */
export function close () {
  if (_db) return _db.close();
  else return null;
}

export function create (item: object, col: string, config?: object) {
  return connectDB()
    .then((db) => {
      let collection = db.collection(col);
      return collection
        .insertOne(item, config)
        .then((doc) => {
          if (doc) return doc;
          else return null;
        })
        .catch((err) => {
          throw new Error(err.stack);
        });
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function read (params: object, col: string, config?: object) {
  return connectDB()
    .then((db) => {
      let collection = db.collection(col);
      return collection
        .findOne(params, config)
        .then((doc) => {
          if (doc) return doc;
          else return null;
        })
        .catch((err) => {
          throw new Error(err.stack);
        });
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function readAll (params: object, col: string) {
  return connectDB()
    .then((db) => {
      let collection = db.collection(col);
      return new Promise((resolve, reject) => {
        collection.find(params).toArray((err, docs) => {
          if (err) return reject(err);
          else return resolve(docs);
        });
      });
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function update (id: string, col: string, config: object) {
  return connectDB()
    .then((db) => {
      let collection = db.collection(col);
      return collection.findOneAndUpdate({ _id: id }, config, { returnOriginal: false });
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function destroy (id: string, col: string) {
  return connectDB()
    .then((db) => {
      let collection = db.collection(col);
      return collection.findOneAndDelete({ _id: new mongodb.ObjectID(id) });
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
}

export function destroyAllMatches (params: object, col: string) {
  return connectDB()
    .then((db) => {
      let collection = db.collection(col);
      return collection.remove(params)
    })
    .catch((err) => {
      throw new Error(err.stack);
    })
}

export function count (params: object, col: string) {
  return connectDB()
    .then((db) => {
      let collection = db.collection(col)
      return collection.count(params)
    })
    .catch((err) => {
      throw new Error(err.stack)
    })
}
