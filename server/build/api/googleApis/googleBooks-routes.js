"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const googleBooks_1 = require("../googleApis/googleBooks");
const authService_1 = require("../../auth/authService");
const router = express.Router();
router.post('/', authService_1.jwtCheck, (req, res) => {
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
exports.default = router;
