import { FastifyInstance } from 'fastify'

import { registerOrganization } from './registerOrganization'
import { authenticateOrganization } from './authenticateOrganization'
import { refresh } from './refreshTokenOrganization'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organization', registerOrganization)
  app.post('/sessions', authenticateOrganization)

  app.patch('/token/refresh', refresh)
}
