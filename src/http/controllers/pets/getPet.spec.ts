import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const petCreatedResponse = await request(app.server)
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

    const { pet } = petCreatedResponse.body

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .query({
        city: 9751,
        age: 'CUB',
        size: 'BIG',
        energy_level: 3,
        independency_level: 'LOW',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Doguinho',
      }),
    )
  })
})
