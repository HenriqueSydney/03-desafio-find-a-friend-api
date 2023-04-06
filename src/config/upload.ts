import multer from 'fastify-multer'
import { randomBytes } from 'crypto'
import { resolve } from 'path'

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, tmpFolder)
    },
    filename: (_, file, callback) => {
      const fileHash = randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      callback(null, fileName)
    },
  }),
}
