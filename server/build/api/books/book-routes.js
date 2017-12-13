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
router.get('/', (req, res) => {
    DB.findAll({}, 'books').then((doc) => res.json(doc)).catch((err) => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
    DB.find({ _id: req.params.id }, 'books', {}).then((results) => res.json(results)).catch((err) => res.status(500).json(err));
});
router.post('/search', (req, res) => {
    const { title, author } = req.body;
    DB.find({ $and: [{ "volumeInfo.title": { $eq: title } }, {
                "volumeInfo.authors": author
            }] }, 'books', {}).then((result) => __awaiter(this, void 0, void 0, function* () {
        if (result) {
            return res.json(result);
        }
        else {
            const data = yield googleBooks_1.getBook(title, author);
            return res.json(data);
        }
    })).catch((err) => {
        return res.status(500).json(err);
    });
});
exports.default = router;
