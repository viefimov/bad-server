import { existsSync, rename } from 'fs'
import { basename, join } from 'path'

function movingFile(imagePath: string, from: string, to: string) {
    const fileName = basename(imagePath)
    const imagePathTemp = join(from, fileName)
    const imagePathPermanent = join(to, fileName)
    if (!existsSync(imagePathTemp)) {
        throw new Error('Ошибка при сохранении файла')
    }

    rename(imagePathTemp, imagePathPermanent, (err) => {
        if (err) {
            throw new Error('Ошибка при сохранении файла')
        }
    })
}

export default movingFile
