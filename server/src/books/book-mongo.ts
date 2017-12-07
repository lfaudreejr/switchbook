import * as mongodb from 'mongodb';
import { connectDB } from '../mongodb';
import { Book } from '../books/Book';
import { config } from '../config';

const BOOKS = 'books';

/**
 * Create
 */
function create (book: Book) {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(BOOKS);
      return collection
        .insertOne(book)
        .then((doc: mongodb.CursorResult) => {
          return new Book(doc._id, doc.title, doc.authors, doc.description, doc.thumbnail);
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
 * Read
 */
function read (_id: string) {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(BOOKS);
      return collection
        .findOne({ _id: _id })
        .then((doc: mongodb.CursorResult) => {
          if (doc) {
            return new Book(doc._id, doc.title, doc.authors, doc.description, doc.thumbnail);
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
 * Read All
 */
function readAll () {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(BOOKS);
      return new Promise((resolve, reject) => {
        collection.find({}).toArray((err, docs) => {
          if (err) return reject(err);
          else return resolve(docs);
        });
      });
    })
    .catch((err: Error) => {
      throw new Error(err.stack);
    });
}
/**
 * Update Book
 */
function update (_id: string, config: object) {
  return connectDB().then((db: mongodb.Db) => {
    let collection: mongodb.Collection = db.collection(BOOKS);
    return collection.findOneAndUpdate({ _id: _id }, config);
  });
}
/**
 * Destroy Book
 */
function destroy (_id: string) {
  return connectDB()
    .then((db: mongodb.Db) => {
      let collection: mongodb.Collection = db.collection(BOOKS);
      return collection.findOneAndDelete({ _id: _id });
    })
    .catch((err: Error) => {
      throw new Error(err.stack);
    });
}

export const booksDB = {
  connectDB,
  create,
  read,
  readAll,
  destroy
};
