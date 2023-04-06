import { FastifyInstance } from 'fastify'

import multer from 'fastify-multer'
import uploadConfig from '@/config/upload'

import { verifyJWT } from '@/http/middlewares/verifyJwt'

import { createPet } from './createPet'
import { searchPets } from './searchPets'
import { getPet } from './getPet'
import { uploadPetImages } from './uploadPetImages'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  const upload = multer({ storage: uploadConfig.storage })

  app.post('/pets', createPet)
  app.post(
    '/pets/images/:petId',
    { preHandler: [upload.array('images')] },
    uploadPetImages,
  )
  app.get('/pets/search', searchPets)
  app.get('/pets/:petId', getPet)
}
