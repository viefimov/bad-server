import { NextFunction, Request, Response, Router } from 'express'
import NotFoundError from '../errors/not-found-error'
import { getCsrfToken } from '../controllers/csrf-token'

import auth from '../middlewares/auth'
import authRouter from './auth'
import customerRouter from './customers'
import orderRouter from './order'
import productRouter from './product'
import uploadRouter from './upload'

const router = Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/order', auth, orderRouter)
router.use('/upload', auth, uploadRouter)
router.use('/customers', auth, customerRouter)
router.get('/csrf-token', getCsrfToken)

router.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError('Маршрут не найден'))
})

export default router
