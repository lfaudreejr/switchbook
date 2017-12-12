"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const config_1 = require("./config");
const routes_1 = require("./api/routes");
const favicon = require('serve-favicon');
exports.app = express();
exports.server = new http.Server(exports.app);
const port = normalizePort(config_1.config.PORT || 3000);
exports.app.set('port', port);
if (process.env.NODE_ENV !== 'production') {
    exports.app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });
}
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(bodyParser.json());
exports.app.use(compression());
exports.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
exports.app.use('/api', routes_1.default);
exports.app.use(function (req, res, next) {
    const err = new Error('404');
    next(err);
});
exports.server.listen(port);
exports.server.on('error', onError);
exports.server.on('listening', onListening);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = exports.server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
