import * as express from 'express';
import { getBook } from '../googleApis/googleBooks';
const router = express.Router();

router.post('/', (req, res) => {
  const { title, author } = req.body.book;
  let book = getBook(title, author);
  book
    .then((results) => {
      const { data } = results;
      return res.send(data);
    })
    .catch((err) => {
      throw new Error(err.stack);
    });
});

export default router;
