import { makeAuthenticateOrganizationUseCase } from '@/useCases/factories/makeAuthenticateOrganizationUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateOrganizationUseCase = makeAuthenticateOrganizationUseCase()

  const { organization } = await authenticateOrganizationUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
