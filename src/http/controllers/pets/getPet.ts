import { makeGetPetUseCase } from '@/useCases/factories/makeGetPetUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({ petId })

  return reply.status(200).send({ pet })
}
