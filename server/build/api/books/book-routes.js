"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DB = require("../../helpers/database");
const authService_1 = require("../../auth/authService");
const router = express.Router();
router.use(authService_1.jwtCheck);
router.get('/', (req, res) => {
    DB.findAll({}, 'books').then((doc) => res.json(doc)).catch((err) => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
    DB.find({ _id: req.params.id }, 'books', {}).then((results) => res.json(results)).catch((err) => res.status(500).json(err));
});
exports.default = router;
