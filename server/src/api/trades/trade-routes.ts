import * as express from 'express';
import * as DB from '../../helpers/database';
import { jwtCheck, getProfile } from '../../auth/authService';

const router = express.Router()
const TRADES = 'trades'

/**
 *  Get all user requested trades
 */
router.get('/', jwtCheck, getProfile, async (req, res) => {
  const USER = req.body.profile.nickname || req.body.profile.name;
  try {
    const USER_TRADES = await DB.findAll({
      requestor: USER
    }, TRADES)
    return res.json(USER_TRADES) 
  } catch (err) {
    return res.status(500).json(err)
  }
})
/**
 *  Get all user pending trades
 */
router.get('/pending', jwtCheck, getProfile, async (req, res) => {
  const USER = req.body.profile.nickname || req.body.profile.name;
  try {
    const PENDING = await DB.findAll({
      currentOwner: USER
    }, TRADES)
    return res.json(PENDING)
  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 *  Request a trade
 */
router.post('/request', jwtCheck, getProfile, async (req, res) => {
  const tradeRequest = {
    requestor: req.body.profile.nickname || req.body.profile.name,
    requestedBook: req.body.requestedBook,
    currentOwner: req.body.currentOwner,
    bookOffered: req.body.bookOffered
  }
  console.log(tradeRequest)
  try {
    const FOUND = await DB.find(tradeRequest, TRADES, {})
    if (FOUND) {
      return res.json(FOUND)
    } else {
      await DB.make(tradeRequest, TRADES, {}).then((data) => res.json(data)).catch((err) => res.status(500).json(err))
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})
/**
 *  Accept a trade
 */
router.post('/accept', jwtCheck, getProfile, (req, res) => {})

/**
 *  Get number of pending trades
 */
router.get('/pending/number', jwtCheck, getProfile, async (req, res) => {
  const USER = req.body.profile.nickname || req.body.profile.name;
  try {
    const COUNT = await DB.getCount({owner: USER}, TRADES)
    return res.json(COUNT)
  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 *  Get number of requested trades
 */
router.get('/pending/requested', jwtCheck, getProfile, async (req, res) => {
  const USER = req.body.profile.nickname || req.body.profile.name;
  try {
    const COUNT = await DB.getCount({requestor: USER}, TRADES)
    return res.json(COUNT)
  } catch (err) {
    return res.status(500).json(err)
  }
})

export default router