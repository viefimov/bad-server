import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import BadRequestError from '../errors/bad-request-error'
import { faker } from '@faker-js/faker'
export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    try {
        // Генерация нового уникального имени файла без оригинального имени
        const generatedFileName = `${faker.string.uuid()}.jpg`

        const filePath = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${generatedFileName}`
            : `/${generatedFileName}`

        console.log('File uploaded successfully:', filePath)

        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName: filePath,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error)
        return next(error)
    }
}

export default {}
