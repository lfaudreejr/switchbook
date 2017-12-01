import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';

import { config } from '../config';

export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://lfaudreejr.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:3000/auth',
  issuer: config.AUTH0_DOMAIN,
  algorithms: [ 'RS256' ]
});
