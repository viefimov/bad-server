import { Request, Express, Response, NextFunction } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { join, extname } from 'path'
import { faker } from '@faker-js/faker'
import sharp from 'sharp'
import { MAX_FILE_SIZE, MIN_FILE_SIZE } from '../config'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        const destinationPath = join(
            __dirname,
            process.env.UPLOAD_PATH_TEMP
                ? `../public/${process.env.UPLOAD_PATH_TEMP}`
                : '../public'
        )
        console.log('File will be saved to:', destinationPath)
        cb(null, destinationPath)
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        const uniqueFileName = `${faker.string.uuid()}${extname(file.originalname)}`
        console.log('Generated unique filename:', uniqueFileName)
        cb(null, uniqueFileName)
    },
})

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!types.includes(file.mimetype)) {
        return cb(null, false)
    }

    return cb(null, true)
}

async function checkImageMetadata(filePath: string): Promise<sharp.Metadata> {
    try {
        const metadata = await sharp(filePath).metadata()
        return metadata
    } catch (error) {
        console.error('Ошибка чтения метаданных изображения:', error)
        throw new Error('Недопустимый файл изображения')
    }
}

const fileSizeCheck = (req: Request, res: any, next: any) => {
    if (req.file) {
        const fileSize = req.file.size
        if (fileSize < MIN_FILE_SIZE) {
            return res.status(400).send({
                message:
                    'Размер файла слишком мал. Минимальный размер файла — 2 КБ.',
            })
        }
        if (fileSize > MAX_FILE_SIZE) {
            return res.status(400).send({
                message:
                    'Размер файла слишком велик. Максимальный размер файла — 10 МБ.',
            })
        }
    }
    next()
}

async function imageDimensionsCheck(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const MIN_IMAGE_WIDTH = 50
    const MIN_IMAGE_HEIGHT = 50

    if (!req.file) {
        res.status(404).json({
            error: 'Файл не загружен',
        })
        return
    }

    try {
        const metadata = await checkImageMetadata(req.file.path)

        const { width = 0, height = 0 } = metadata

        if (width < MIN_IMAGE_WIDTH || height < MIN_IMAGE_HEIGHT) {
            res.status(400).json({
                error: `Изображение слишком маленькое. Минимальные размеры ${MIN_IMAGE_WIDTH}x${MIN_IMAGE_HEIGHT}.`,
            })
            return
        }

        next()
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                error: error.message,
            })
        } else {
            res.status(500).json({
                error: 'Произошла неизвестная ошибка',
            })
        }
    }
}

const upload = multer({
    storage,
    fileFilter,
    // limits: { fileSize: MAX_FILE_SIZE },
})

export default { upload, fileSizeCheck, imageDimensionsCheck }
