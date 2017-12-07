import * as express from 'express';
import * as mongo from '../mongodb';
import { getBook } from '../googleApis/googleBooks';
import { jwtCheck } from '../auth/authService';
import { Book } from '../books/Book';

const router = express.Router();

/**
 * Get all books for library
 */
router.get('/', (req, res) => {
  mongo.readAll('books').then((doc) => res.json(doc)).catch((err) => res.status(500).json(err));
});
/**
 * Create a book (Create)
 */
// router.post('/', (req, res) => {});
/**
 * Get a book by _id (Read)
 */
// router.get('/:id', (req, res) => {});
/**
 * Delete a book by _id (Delete)
 */
// router.delete('/:id', (req, res) => {});

export default router;
