import * as express from 'express';
import { getBook } from '../googleApis/googleBooks';
import { jwtCheck } from '../../auth/authService';
const router = express.Router();

router.post('/', jwtCheck, (req, res) => {
  const { title, author } = req.body.book;
  let book = getBook(title, author);
  book
    .then((results) => {
      return res.send(results);
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
});

export default router;
