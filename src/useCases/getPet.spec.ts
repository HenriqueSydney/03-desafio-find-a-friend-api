import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/InMemoryPetsRepository'
import { IOrganizationRepository } from '@/repositories/IOrganizationsRepository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/InMemoryOrganizationsRepository'
import { hash } from 'bcryptjs'
import { Organization } from '@prisma/client'
import { GetPetUseCase } from './getPet'
import { ResourceNotFoundError } from './errors/resourceNotFound'

let petsRepository: IPetsRepository
let organizationsRepository: IOrganizationRepository
let sut: GetPetUseCase
let createdOrganization: Organization

describe('Create Pet Use Case', () => {
  beforeAll(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()

    const organization = await organizationsRepository.create({
      name: 'Pet Friendly',
      owner_name: 'Henrique Sydney',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
      address: '44St, 33 Rd Disney Bl.',
      city: 9751,
      phone: '5553544131',
      state: 'DF',
      zip_code: 70331154,
    })

    createdOrganization = organization
  })

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository([createdOrganization])
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet information by id', async () => {
    const createdPet = await petsRepository.create({
      organizationId: createdOrganization.id,
      name: 'Doguinho',
      description: 'Its a beautiful dog',
      age: 'ADULT',
      size: 'SMALL',
      energy_level: 3,
      independency_level: 'LOW',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Doguinho')
  })

  it('should not be able to get pet information with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'FAKE ID TO TEST',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
