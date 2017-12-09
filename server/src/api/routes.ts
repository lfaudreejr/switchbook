import * as express from 'express'
import userRoutes from './users/user-routes'
import bookRoutes from './books/book-routes'

const router = express.Router()
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});
router.use('/books', bookRoutes)
router.use('/user', userRoutes)

export default router