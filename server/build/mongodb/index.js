"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const config_1 = require("../config");
const MongoClient = mongodb.MongoClient;
let mongoUri;
let _db;
function connectDB() {
    if (config_1.config.NODE_ENV !== 'production') {
        mongoUri = config_1.config.MONGO_DEV_URI;
    }
    else {
        mongoUri = config_1.config.MONGO_PROD_URI;
    }
    return new Promise((resolve, reject) => {
        if (_db)
            return resolve(_db);
        MongoClient.connect(mongoUri, (err, db) => {
            if (err)
                return reject(err);
            _db = db;
            return resolve(_db);
        });
    });
}
exports.connectDB = connectDB;
function close() {
    if (_db)
        return _db.close();
    else
        return null;
}
exports.close = close;
function create(item, col, config) {
    return connectDB()
        .then((db) => {
        let collection = db.collection(col);
        return collection
            .insertOne(item, config)
            .then((doc) => {
            if (doc)
                return doc;
            else
                return null;
        })
            .catch((err) => {
            throw new Error(err.stack);
        });
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.create = create;
function read(params, col, config) {
    return connectDB()
        .then((db) => {
        let collection = db.collection(col);
        return collection
            .findOne(params, config)
            .then((doc) => {
            if (doc)
                return doc;
            else
                return null;
        })
            .catch((err) => {
            throw new Error(err.stack);
        });
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.read = read;
function readAll(params, col) {
    return connectDB()
        .then((db) => {
        let collection = db.collection(col);
        return new Promise((resolve, reject) => {
            collection.find(params).toArray((err, docs) => {
                if (err)
                    return reject(err);
                else
                    return resolve(docs);
            });
        });
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.readAll = readAll;
function update(id, col, config) {
    return connectDB()
        .then((db) => {
        let collection = db.collection(col);
        return collection.findOneAndUpdate({ _id: id }, config, { returnOriginal: false });
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.update = update;
function destroy(id, col) {
    return connectDB()
        .then((db) => {
        let collection = db.collection(col);
        return collection.findOneAndDelete({ _id: new mongodb.ObjectID(id) });
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.destroy = destroy;
function count(params, col) {
    return connectDB()
        .then((db) => {
        let collection = db.collection(col);
        return collection.count(params);
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.count = count;
