"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB = require("../mongodb");
function find(params, col, config) {
    return DB
        .read(params, col, config)
        .then((doc) => {
        return doc;
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.find = find;
function change(params, col, config) {
    return DB
        .update(params, col, config)
        .then((doc) => {
        return doc;
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.change = change;
function make(params, col, config) {
    return DB
        .create(params, col, config)
        .then((doc) => {
        return doc.ops[0];
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.make = make;
function findAll(params, col) {
    return DB
        .readAll(params, col)
        .then((docs) => {
        return docs;
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.findAll = findAll;
function remove(params, col) {
    return DB
        .destroy(params, col)
        .then((doc) => {
        return doc.value;
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.remove = remove;
function removeAllMatches(params, col) {
    return DB
        .destroyAllMatches(params, col)
        .then((doc) => doc.result)
        .catch((err) => {
        throw new Error(err.stack);
    });
}
exports.removeAllMatches = removeAllMatches;
function getCount(param, col) {
    return DB.count(param, col)
        .then((count) => {
        return count;
    }).catch((err) => {
        throw new Error(err.stack);
    });
}
exports.getCount = getCount;
