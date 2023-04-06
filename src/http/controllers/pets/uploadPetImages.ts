import { makeUploadPetImagesUseCase } from '@/useCases/factories/makeUploadPetImagesUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface IFiles {
  filename: string
}

export async function uploadPetImages(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const uploadPetImagesParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = uploadPetImagesParamsSchema.parse(request.params)

  const images = request.files as IFiles[]

  const uploadPetImages = makeUploadPetImagesUseCase()

  const fileNames = images.map((file) => file.filename)

  uploadPetImages.execute({ petId, imagesName: fileNames })

  return reply.status(201).send()
}
