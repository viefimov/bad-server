import { Request, Response } from 'express'
import { generateToken } from '../middlewares/csrf-protect'

export const getCsrfToken = (req: Request, res: Response) => {
    const csrfToken = generateToken(req, res, true)
    res.json({ csrfToken })
}
