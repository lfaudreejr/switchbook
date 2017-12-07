import * as express from 'express';
import { getBook } from '../googleApis/googleBooks';
import { jwtCheck } from '../auth/authService';
const router = express.Router();

router.post('/', (req, res) => {
  const { title, author } = req.body.book;
  let book = getBook(title, author);
  book
    .then((results) => {
      const { items } = results.data;
      return res.send(items[0]);
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
});

export default router;
