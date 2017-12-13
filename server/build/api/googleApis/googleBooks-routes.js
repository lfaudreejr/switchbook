"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DB = require("../../helpers/database");
const googleBooks_1 = require("../googleApis/googleBooks");
const authService_1 = require("../../auth/authService");
const router = express.Router();
router.use(authService_1.jwtCheck);
router.post('/', (req, res) => {
    const { title, author } = req.body.book;
    let book = googleBooks_1.getBook(title, author);
    book
        .then((results) => {
        return res.send(results);
    })
        .catch((err) => {
        throw new Error(err.stack);
    });
});
router.post('/books', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { title, author } = req.body;
    console.log('title', title);
    let foundBook;
    foundBook = yield DB.find({ title: title }, 'books', {});
    if (foundBook) {
        return res.json(foundBook);
    }
    else {
        let books = yield googleBooks_1.getFiveBooks(title, author);
        console.log('books', books.data);
        return res.json(books.data);
    }
}));
exports.default = router;
