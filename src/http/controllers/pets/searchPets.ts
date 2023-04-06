import { FastifyReply, FastifyRequest } from 'fastify'
import { Age, IndependencyLevel, Size } from '@prisma/client'

import { makeSearchPetUseCase } from '@/useCases/factories/makeSearchPetUseCase'

import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.coerce.number(),
    age: z.nativeEnum(Age).nullable(),
    size: z.nativeEnum(Size).nullable(),
    independency_level: z.nativeEnum(IndependencyLevel).nullable(),
    energy_level: z.coerce.number().min(1).max(5).nullable(),
    page: z.coerce.number().default(1),
  })

  const { city, age, size, independency_level, energy_level, page } =
    searchPetsQuerySchema.parse(request.query)

  const queryParams = {
    city,
    age,
    size,
    independency_level,
    energy_level,
  }

  const searchPetsUseCase = makeSearchPetUseCase()

  const { pets } = await searchPetsUseCase.execute({ queryParams, page })

  return reply.status(200).send({ pets })
}
