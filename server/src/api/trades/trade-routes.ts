import * as express from 'express';
import * as DB from '../../helpers/database';
import { jwtCheck } from '../../auth/authService';

const router = express.Router()
const TRADES = 'trades'
const BOOKS = 'books'

/**
 * 
 */
router.use(jwtCheck)
// router.use(getProfile)
/**
 *  Get all user requested trades
 */
router.get('/', async (req, res) => {
  // const USER = req.body.profile.nickname || req.body.profile.name;
  const USER = req.headers.profile
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
 *  Get all user pending incoming trades
 */
router.get('/pending', async (req, res) => {
  // const USER = req.body.profile.nickname || req.body.profile.name;
  const USER = req.headers.profile
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
router.post('/request', async (req, res) => {
  const tradeRequest = {
    // requestor: req.body.profile.nickname || req.body.profile.name,
    requestor: req.headers.profile,
    requestedBook: req.body.requestedBook,
    currentOwner: req.body.currentOwner,
    bookOffered: req.body.bookOffered
  }
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
 *  Accept a trade request
 */
router.post('/accept', async (req, res) => {
  // const USER = req.body.profile.nickname || req.body.profile.name;
  const USER = req.headers.profile
  try {
    const {bookOffered, requestedBook, currentOwner, requestor, _id} = req.body
    // Update request where user is requestor
    DB.change(requestedBook._id, BOOKS, {
      $pull: {
        owners: currentOwner
      }
    })
    DB.change(requestedBook._id, BOOKS, {
      $push: {
        owners: requestor
      }
    })
    // Update offered book where user is currentOwner
    DB.change(bookOffered._id, BOOKS, {
      $pull: {
        owners: requestor
      }
    })
    DB.change(bookOffered._id, BOOKS, {
      $push: {
        owners: currentOwner
      }
    })
    const REMOVED = await DB.remove(_id, TRADES)
    return res.json(REMOVED)

  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 *  Decline/Delete a trade 
 */
router.delete('/delete/:id', async (req, res) => {
  const USER = req.headers.profile
  // const USER = req.body.profile.nickname || req.body.profile.name;
  try {
    const ID = req.params.id
    const DELETED = await DB.remove(ID, TRADES)
    return res.json(DELETED)
  } catch (err) {
    return res.status(500).json(err)
  }
})
/**
 *  Get number of pending trades
 */
router.get('/pending/incoming', async (req, res) => {
  const USER = req.headers.profile
  // const USER = req.body.profile.nickname || req.body.profile.name;
  try {
    const COUNT = await DB.getCount({currentOwner: USER}, TRADES)
    return res.json(COUNT)
  } catch (err) {
    return res.status(500).json(err)
  }
})

/**
 *  Get number of requested trades
 */
router.get('/pending/requested', async (req, res) => {
  const USER = req.headers.profile
  // const USER = req.body.profile.nickname || req.body.profile.name;
  try {
    const COUNT = await DB.getCount({requestor: USER}, TRADES)
    return res.json(COUNT)
  } catch (err) {
    return res.status(500).json(err)
  }
})

export default router