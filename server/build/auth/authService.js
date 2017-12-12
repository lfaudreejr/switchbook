"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const config_1 = require("../config");
exports.jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 25,
        jwksUri: 'https://lfaudreejr.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://switchbook.herokuapp.com/auth',
    issuer: config_1.config.AUTH0_DOMAIN,
    algorithms: ['RS256']
});
