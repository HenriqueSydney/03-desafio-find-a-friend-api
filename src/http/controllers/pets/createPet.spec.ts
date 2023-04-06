import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'

describe('Create a Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Doguinho',
        description: 'Its a beautiful dog',
        age: 'ADULT',
        size: 'SMALL',
        energy_level: 3,
        independency_level: 'LOW',
      })

    expect(response.statusCode).toEqual(201)
  })
})
