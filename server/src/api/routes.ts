import * as express from 'express'
import userRoutes from './users/user-routes'
import bookRoutes from './books/book-routes'
import tradeRoutes from './trades/trade-routes'
import googleRoutes from './googleApis/googleBooks-routes'

const router = express.Router()

router.use('/books', bookRoutes)
router.use('/user', userRoutes)
router.use('/trades', tradeRoutes)
router.use('/googleBooks', googleRoutes)

export default router