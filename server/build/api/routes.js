"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_routes_1 = require("./users/user-routes");
const book_routes_1 = require("./books/book-routes");
const trade_routes_1 = require("./trades/trade-routes");
const router = express.Router();
router.use(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});
router.use('/books', book_routes_1.default);
router.use('/user', user_routes_1.default);
router.use('/trades', trade_routes_1.default);
exports.default = router;
