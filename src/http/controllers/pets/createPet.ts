import { makeCreatePetUseCase } from '@/useCases/factories/makeCreatePetUseCase'
import { Age, IndependencyLevel, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.nativeEnum(Age),
    size: z.nativeEnum(Size),
    independency_level: z.nativeEnum(IndependencyLevel),
    energy_level: z.coerce.number().min(1).max(5),
  })

  const { name, description, age, size, independency_level, energy_level } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const pet = await createPetUseCase.execute({
    organization_id: request.user.sub,
    name,
    description,
    age,
    size,
    independency_level,
    energy_level,
  })

  return reply.status(201).send(pet)
}
