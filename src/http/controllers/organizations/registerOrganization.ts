import { makeRegisterOrganizationUseCase } from '@/useCases/factories/makeRegisterOrganizationUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrganizationBodySchema = z.object({
    name: z.string(),
    owner_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    zip_code: z.coerce.number(),
    state: z.string().min(2).max(2),
    city: z.coerce.number(),
    address: z.string(),
  })

  const {
    name,
    owner_name,
    email,
    password,
    phone,
    zip_code,
    state,
    city,
    address,
  } = registerOrganizationBodySchema.parse(request.body)

  const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

  const { organization } = await registerOrganizationUseCase.execute({
    name,
    owner_name,
    email,
    password,
    phone,
    zip_code,
    state,
    city,
    address,
  })

  return reply.status(201).send(organization)
}
