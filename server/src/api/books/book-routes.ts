import * as express from 'express';
import * as DB from '../../helpers/database';
import { getBook } from '../googleApis/googleBooks';
import { jwtCheck, getProfile } from '../../auth/authService';
import { Book } from '../books/Book';

const router = express.Router();

/**
 * Get all books for library
 */
router.get('/', jwtCheck, (req, res) => {
  DB.findAll('books').then((doc) => res.json(doc)).catch((err) => res.status(500).json(err));
});
/**
 * Create a book (Create)
 */
// router.post('/', (req, res) => {});
/**
 * Get a book by _id (Read)
 */
router.get('/:id', (req, res) => {
  DB.find(req.params.id, 'books', {}).then((results) => res.json(results)).catch((err) => res.status(500).json(err))
});
/**
 * Delete a book by _id (Delete)
 */
// router.delete('/:id', (req, res) => {});

export default router;
