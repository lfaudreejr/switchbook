import * as mongodb from 'mongodb';
import { connectDB } from '../mongodb';
import { User } from './User';
import { config } from '../config';

const USER = 'user';
/**
 * Create
 */
function create (user: User) {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(USER);
      return collection.insertOne(user).then((doc) => doc).catch((err) => {
        throw new Error(err.stack);
      });
    })
    .catch((err: Error) => {
      throw new Error(err.stack);
    });
}
/**
 * Read
 */
function read (_id: string) {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(USER);
      return collection
        .findOne({ _id: _id })
        .then((doc: mongodb.CursorResult) => {
          if (doc) {
            return new User(doc._id);
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw new Error(err.stack);
        });
    })
    .catch((err: Error) => {
      throw new Error(err.stack);
    });
}
/**
 * Update
 */
function update (_id: string, param: string, option: string) {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(USER);
      return collection.findOneAndUpdate({ _id: _id }, { $set: { param: option } });
    })
    .catch((err: Error) => {
      throw new Error(err.stack);
    });
}
/**
 * Delete
 */
function destroy (_id: string) {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(USER);
      return collection.findOneAndDelete({ _id: _id });
    })
    .catch((err: Error) => {
      throw new Error(err.stack);
    });
}

export const userDB = {
  connectDB,
  create,
  read,
  destroy
};
