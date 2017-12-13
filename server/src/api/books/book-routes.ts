import * as express from 'express';
import * as DB from '../../helpers/database';
import { getBook } from '../googleApis/googleBooks';
import { jwtCheck } from '../../auth/authService';
import { Book } from '../books/Book';

const router = express.Router();

router.use(jwtCheck)
/**
 * Get all books for library
 */
router.get('/', (req, res) => {
  DB.findAll({},'books').then((doc) => res.json(doc)).catch((err) => res.status(500).json(err));
});
/**
 * Create a book (Create)
 */
// router.post('/', (req, res) => {});

/**
 * Get a book by _id (Read)
 */
router.get('/:id', (req, res) => {
  DB.find({ _id: req.params.id}, 'books', {}).then((results) => res.json(results)).catch((err) => res.status(500).json(err))
});
/**
 * Search for a book by title
 */
router.post('/search', (req, res) => {
  const { title, author } = req.body
  DB.find({ $and: [ { "volumeInfo.title": { $eq: title }  }, {
    "volumeInfo.authors": author
  } ] }, 'books', {}).then(async (result) => {
    if (result) {
      return res.json(result)
    } else {
      const data = await getBook(title, author)
      return res.json(data)
    }
  }).catch((err) => {
    return res.status(500).json(err)
  })
})

/**
 * Delete a book by _id (Delete)
 */
// router.delete('/:id', (req, res) => {});

export default router;
