import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organization').send({
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email: 'johndoe@exemple.com',
      password: '123456',
      address: '44St, 33 Rd Disney Bl.',
      city: 9751,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
