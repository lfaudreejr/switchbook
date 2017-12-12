import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';
import { get } from '../helpers';

import { config } from '../config';
import { Request, Response, NextFunction } from 'express';

export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 25,
    jwksUri: 'https://lfaudreejr.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://switchbook.herokuapp.com/auth',
  issuer: config.AUTH0_DOMAIN,
  algorithms: [ 'RS256' ]
});
