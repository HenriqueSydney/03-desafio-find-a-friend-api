import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { IOrganizationRepository } from '@/repositories/IOrganizationsRepository'
import { AuthenticateOrganizationUseCase } from './authenticateOrganization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/InMemoryOrganizationsRepository'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

let organizationsRepository: IOrganizationRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoe@exemple.com'

    const password = '123456'
    const brasiliaCityCode = 9701
    await organizationsRepository.create({
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email,
      password_hash: await hash('123456', 6),
      address: '44St, 33 Rd Disney Bl.',
      city: brasiliaCityCode,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    })

    const { organization } = await sut.execute({
      email,
      password,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@exemple.com'

    const password = '123456'

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@exemple.com'

    const password = '123456'

    const brasiliaCityCode = 9701
    await organizationsRepository.create({
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email,
      password_hash: await hash('1234567', 6),
      address: '44St, 33 Rd Disney Bl.',
      city: brasiliaCityCode,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    })

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
