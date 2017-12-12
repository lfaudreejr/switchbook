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
const router = express.Router();
const TRADES = 'trades';
const BOOKS = 'books';
router.use(authService_1.jwtCheck);
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const USER_TRADES = yield DB.findAll({
            requestor: USER
        }, TRADES);
        return res.json(USER_TRADES);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
router.get('/pending', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const PENDING = yield DB.findAll({
            currentOwner: USER
        }, TRADES);
        return res.json(PENDING);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
router.post('/request', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const tradeRequest = {
        requestor: req.headers.profile,
        requestedBook: req.body.requestedBook,
        currentOwner: req.body.currentOwner,
        bookOffered: req.body.bookOffered
    };
    try {
        const FOUND = yield DB.find(tradeRequest, TRADES, {});
        if (FOUND) {
            return res.json(FOUND);
        }
        else {
            yield DB.make(tradeRequest, TRADES, {}).then((data) => res.json(data)).catch((err) => res.status(500).json(err));
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
router.post('/accept', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const { bookOffered, requestedBook, currentOwner, requestor, _id } = req.body;
        DB.change(requestedBook._id, BOOKS, {
            $pull: {
                owners: currentOwner
            }
        });
        DB.change(requestedBook._id, BOOKS, {
            $push: {
                owners: requestor
            }
        });
        DB.change(bookOffered._id, BOOKS, {
            $pull: {
                owners: requestor
            }
        });
        DB.change(bookOffered._id, BOOKS, {
            $push: {
                owners: currentOwner
            }
        });
        const REMOVED = yield DB.remove(_id, TRADES);
        return res.json(REMOVED);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const ID = req.params.id;
        const DELETED = yield DB.remove(ID, TRADES);
        return res.json(DELETED);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
router.get('/pending/incoming', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const COUNT = yield DB.getCount({ currentOwner: USER }, TRADES);
        return res.json(COUNT);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
router.get('/pending/requested', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const USER = req.headers.profile;
    try {
        const COUNT = yield DB.getCount({ requestor: USER }, TRADES);
        return res.json(COUNT);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = router;
