"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
exports.getBook = function (title, author) {
    return helpers_1.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&projection=lite&printType=books&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/imageLinks)&maxResults=1`)
        .then((data) => {
        return data.data.items[0];
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
};
exports.getFiveBooks = function (title, author) {
    return helpers_1.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&projection=lite&printType=books&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/imageLinks)&maxResults=5`);
};
