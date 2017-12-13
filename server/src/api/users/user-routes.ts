import * as express from 'express';
import * as DB from '../../helpers/database';
import { jwtCheck } from '../../auth/authService';
import { getBook } from '../googleApis/googleBooks';
import { User } from './User';

const router = express.Router();

const BOOKS = 'books';
const USERS = 'users';

/**
 * 
 */
router.use(jwtCheck)

/**
 * Add Book by User
 */
router.post('/books', async (req, res) => {
  const USER = req.headers.profile
  try {
    const BOOK = await getBook(req.body.title, req.body.author);
    const FOUND = await DB.find({_id: BOOK.id}, BOOKS, {});
    if (FOUND) {
      const ISOWNED = FOUND.owners.find((owner: string) => {
        return owner === USER;
      });
      if (ISOWNED) {
        return res.json(FOUND);
      } else {
        const UPDATED = await DB.change(FOUND._id, BOOKS, { $push: { owners: USER } });
        return res.json(UPDATED.value);
      }
    } else {
      const book = {
        _id: BOOK.id,
        volumeInfo: BOOK.volumeInfo,
        owners: [ USER ]
      };
      const CREATE = await DB.make(book, BOOKS, {});
      return res.json(CREATE);
    }
  } catch (err) {
    throw new Error(err.stack);
  }
});
/**
 * Get Book by User (Read)
 */
router.get('/books', async (req, res) => {
  const USER = req.headers.profile
  try {
    const FOUND = await DB.findAll({owners: USER}, BOOKS);
    return res.json(FOUND);
  } catch (err) {
    throw new Error(err.stack);
  }
});
/**
 * Add User to Book (Update)
 */
// router.put('/books/:id', (req, res) => {});

/**
 * Delete User from Book (Delete)
 */
router.delete('/books/:id', async (req, res) => {
  const ID = req.params.id;
  try {
    const DESTROYED = await DB.remove(ID, BOOKS);
    return res.json(DESTROYED);
  } catch (err) {
    throw new Error(err.stack);
  }
});

export default router;
