import * as mongodb from 'mongodb';
import { User } from './User';
import { config } from '../config';

const MongoClient = mongodb.MongoClient;
const USERS = 'users';
/**
 * Mongo State
 */
let mongoUri: any;
let _db: mongodb.Db;
/**
 * Handle mongo uri per environment
 */
if (config.NODE_ENV === 'production') {
  mongoUri = config.MONGO_PROD_URI;
} else {
  mongoUri = config.MONGO_DEV_URI;
}
/**
 * Mongo connection
 */
function connectDB (): Promise<mongodb.Db> {
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
 * Create
 */
function create (user: User) {
  return connectDB().then((db: mongodb.Db) => {
    let collection: mongodb.Collection = db.collection(USERS);
    return collection
      .insertOne(user)
      .then((doc) => {
        return doc;
      })
      .catch((err: Error) => {
        throw new Error(err.stack);
      });
  });
}
/**
 * Read
 */
function read (_id: string) {
  return connectDB().then((db: mongodb.Db) => {
    let collection: mongodb.Collection = db.collection(USERS);
    return collection
      .findOne({ _id: _id })
      .then((doc: mongodb.CursorResult) => {
        if (doc) {
          return doc;
        } else {
          return null;
        }
      })
      .catch((err: Error) => {
        throw new Error(err.stack);
      });
  });
}
/**
 * Read All
 */
function readAll () {
  return connectDB().then((db: mongodb.Db) => {
    let collection: mongodb.Collection = db.collection(USERS);
    return new Promise((resolve, reject) => {
      let users: User[] = [];
      collection.find({}).forEach(
        (user: mongodb.CursorResult) => {
          users.push(user);
        },
        (err: Error) => {
          if (err) return reject(err);
          else {
            return resolve(users);
          }
        }
      );
    });
  });
}
/**
 * Delete User
 */
function destroy (_id: string) {
  return connectDB().then((db: mongodb.Db) => {
    let collection: mongodb.Collection = db.collection(USERS);
    return collection.findOneAndDelete({ _id: _id });
  });
}

export const usersDB = {
  connectDB,
  create,
  read,
  readAll,
  destroy
};
