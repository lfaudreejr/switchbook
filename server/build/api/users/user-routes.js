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
const authService_1 = require("../../auth/authService");
const googleBooks_1 = require("../googleApis/googleBooks");
const router = express.Router();
const BOOKS = 'books';
const USERS = 'users';
router.use(authService_1.jwtCheck);
router.post('/books', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const BOOK = yield googleBooks_1.getBook(req.body.title, req.body.author);
        const FOUND = yield DB.find({ _id: BOOK.id }, BOOKS, {});
        if (FOUND) {
            const ISOWNED = FOUND.owners.find((owner) => {
                return owner === USER;
            });
            if (ISOWNED) {
                return res.json(FOUND);
            }
            else {
                const UPDATED = yield DB.change(FOUND._id, BOOKS, { $push: { owners: USER } });
                return res.json(UPDATED.value);
            }
        }
        else {
            const book = {
                _id: BOOK.id,
                volumeInfo: BOOK.volumeInfo,
                owners: [USER]
            };
            const CREATE = yield DB.make(book, BOOKS, {});
            return res.json(CREATE);
        }
    }
    catch (err) {
        throw new Error(err.stack);
    }
}));
router.get('/books', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const FOUND = yield DB.findAll({ owners: USER }, BOOKS);
        return res.json(FOUND);
    }
    catch (err) {
        throw new Error(err.stack);
    }
}));
router.delete('/books/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ID = req.params.id;
    try {
        const DESTROYED = yield DB.remove(ID, BOOKS);
        return res.json(DESTROYED);
    }
    catch (err) {
        throw new Error(err.stack);
    }
}));
exports.default = router;
