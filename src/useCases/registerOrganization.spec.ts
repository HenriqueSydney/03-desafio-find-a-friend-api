import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { IOrganizationRepository } from '@/repositories/IOrganizationsRepository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/InMemoryOrganizationsRepository'
import { RegisterOrganizationUseCase } from './registerOrganization'
import { OrganizationAlreadyExistsError } from './errors/OrganizationAlreadyExistsError'

let organizationsRepository: IOrganizationRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create organization', async () => {
    const brasiliaCityCode = 9701

    const { organization } = await sut.execute({
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email: 'johndoe@exemple.com',
      password: '123456',
      address: '44St, 33 Rd Disney Bl.',
      city: brasiliaCityCode,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const brasiliaCityCode = 9701
    const { organization } = await sut.execute({
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email: 'johndoe@exemple.com',
      password: '123456',
      address: '44St, 33 Rd Disney Bl.',
      city: brasiliaCityCode,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const brasiliaCityCode = 9701
    await sut.execute({
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email: 'johndoe@exemple.com',
      password: '123456',
      address: '44St, 33 Rd Disney Bl.',
      city: brasiliaCityCode,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    })

    await expect(() =>
      sut.execute({
        name: 'Pet Friendly',
        owner_name: 'Henrique Sydney',
        email: 'johndoe@exemple.com',
        password: '123456',
        address: '44St, 33 Rd Disney Bl.',
        city: brasiliaCityCode,
        phone: '5553544131',
        state: 'DF',
        zip_code: 70331154,
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
