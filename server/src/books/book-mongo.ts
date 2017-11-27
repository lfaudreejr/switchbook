import * as mongodb from 'mongodb';
import { Book } from '../books/Book';
import { config } from '../config';

const MongoClient = mongodb.MongoClient;
const BOOKS = 'books';
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
 * Mongo Db connection
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
function create (book: Book) {
  return connectDB().then((db: mongodb.Db) => {
    let collection: mongodb.Collection = db.collection(BOOKS);
    return collection
      .insertOne(book)
      .then((doc) => {
        // return book;
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
    let collection: mongodb.Collection = db.collection(BOOKS);
    return collection
      .findOne({ _id: _id })
      .then((doc: mongodb.CursorResult) => {
        if (doc) {
          // let book = new Book(doc._id, doc.title, doc.authors, doc.description, doc.thumbnail);
          // return book;
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
    let collection: mongodb.Collection = db.collection(BOOKS);
    return new Promise((resolve, reject) => {
      let books: Book[] = [];
      collection.find({}).forEach(
        (book: mongodb.CursorResult) => {
          books.push(book);
        },
        (error: Error) => {
          if (error) return reject(error);
          else {
            return resolve(books);
          }
        }
      );
    });
  });
}

function destroy (_id: string) {
  return connectDB().then((db: mongodb.Db) => {
    let collection: mongodb.Collection = db.collection(BOOKS);
    return collection.findOneAndDelete({ _id: _id });
  });
}

export const booksDB = {
  connectDB,
  create,
  read,
  readAll,
  destroy
};
