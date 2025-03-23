import { Router, NextFunction, Request, Response } from 'express'
import BadRequestError from '../errors/bad-request-error'
import {
    createOrder,
    deleteOrder,
    getOrderByNumber,
    getOrderCurrentUserByNumber,
    getOrders,
    getOrdersCurrentUser,
    updateOrder,
} from '../controllers/order'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { validateOrderBody } from '../middlewares/validations'
import { doubleCsrfProtection } from '../middlewares/csrf-protect' 
import { Role } from '../models/user'

const orderRouter = Router()

const checkQueryOnObject = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const keys = Object.keys(req.query)
    for (let i = 0; i < keys.length; i += 1) {
        if (typeof req.query[keys[i]] === 'object') {
            next(
                new BadRequestError('Параметр не может быть object!')
            )
        }
    }
    next()
}

orderRouter.post('/', auth, validateOrderBody, createOrder)

orderRouter.get(
    '/all',
    auth,
    roleGuardMiddleware(Role.Admin), 
    checkQueryOnObject, 
    getOrders
)

orderRouter.get('/all/me', auth, getOrdersCurrentUser)

orderRouter.get(
    '/:orderNumber',
    auth,
    roleGuardMiddleware(Role.Admin),
    getOrderByNumber
)

orderRouter.get('/me/:orderNumber', auth, getOrderCurrentUserByNumber)

orderRouter.patch(
    '/:orderNumber',
    auth,
    doubleCsrfProtection, 
    roleGuardMiddleware(Role.Admin),
    updateOrder
)

orderRouter.delete(
    '/:id',
    auth,
    doubleCsrfProtection, 
    roleGuardMiddleware(Role.Admin),
    deleteOrder
)

export default orderRouter
