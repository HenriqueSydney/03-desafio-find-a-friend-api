import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/tests/createAndAuthenticateOrganization'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by query params', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Doguinho 2',
        description: 'Its a beautiful dog',
        age: 'CUB',
        size: 'BIG',
        energy_level: 3,
        independency_level: 'LOW',
      })

    const response = await request(app.server)
      .get('/pets/search')
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
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Doguinho 2',
      }),
    ])
  })
})
