import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
      address: '44St, 33 Rd Disney Bl.',
      city: 9751,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@exemple.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
