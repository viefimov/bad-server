import { ErrorRequestHandler } from 'express'
import { invalidCsrfTokenError } from './csrf-protect'

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err === invalidCsrfTokenError) {
        return res.status(403).send({ message: 'Invalid CSRF token' })
    }

    const statusCode = err.statusCode || 500
    const message =
        statusCode === 500 ? 'На сервере произошла ошибка' : err.message

    console.error('Error:', err.message)
    console.error('Stack:', err.stack)

    res.status(statusCode).send({ message })
}

export default errorHandler
