import * as express from 'express';
import * as DB from '../../helpers/database';
import { jwtCheck, getProfile } from '../../auth/authService';

const router = express.Router()
const TRADES = 'trades'
/**
 * Request a trade
 */
router.post('/request', (req, res) => {
  // const tradeRequest = {
  //   requestor: req.body.profile.nickname || req.body.profile.name,
  //   requestedBook: req.body._id,
  //   currentOwner: req.body.owner,
  //   bookOffered: req.body.offer
  // }
  // DB.make()
})
/**
 * Accept a trade
 */
router.post('/accept', (req, res) => {})

export default router