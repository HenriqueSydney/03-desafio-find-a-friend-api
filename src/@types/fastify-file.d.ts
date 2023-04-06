import { File } from 'fastify-multer/lib/interfaces'

declare module 'fastify' {
  export interface FastifyRequest {
    files: File[]
  }
}
