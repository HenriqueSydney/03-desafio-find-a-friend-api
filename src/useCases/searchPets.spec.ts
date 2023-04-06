import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/InMemoryPetsRepository'
import { IOrganizationRepository } from '@/repositories/IOrganizationsRepository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/InMemoryOrganizationsRepository'
import { hash } from 'bcryptjs'
import { Organization } from '@prisma/client'
import { SearchPetsUseCase } from './searchPets'

let petsRepository: IPetsRepository
let organizationsRepository: IOrganizationRepository
let sut: SearchPetsUseCase
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
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets only by city of the organization', async () => {
    for (let i = 1; i <= 10; i++) {
      await petsRepository.create({
        organizationId: createdOrganization.id,
        name: 'Doguinho',
        description: 'Its a beautiful dog',
        age: 'ADULT',
        size: 'SMALL',
        energy_level: 3,
        independency_level: 'LOW',
      })
    }

    const { pets } = await sut.execute({
      queryParams: {
        city: 9751,
      },
      page: 1,
    })

    expect(pets).toHaveLength(10)
  })

  it('should be able to search pets only by city of the organization and age of pet', async () => {
    for (let i = 1; i <= 10; i++) {
      await petsRepository.create({
        organizationId: createdOrganization.id,
        name: 'Doguinho',
        description: 'Its a beautiful dog',
        age: 'ADULT',
        size: 'SMALL',
        energy_level: 3,
        independency_level: 'LOW',
      })
    }

    const { pets } = await sut.execute({
      queryParams: {
        city: 9751,
        age: 'ADULT',
      },
      page: 1,
    })

    expect(pets).toHaveLength(10)
  })

  it('should be able to search pets only by city of the organization and size of pet', async () => {
    for (let i = 1; i <= 10; i++) {
      await petsRepository.create({
        organizationId: createdOrganization.id,
        name: 'Doguinho',
        description: 'Its a beautiful dog',
        age: 'ADULT',
        size: 'SMALL',
        energy_level: 3,
        independency_level: 'LOW',
      })
    }

    const { pets } = await sut.execute({
      queryParams: {
        city: 9751,
        size: 'SMALL',
      },
      page: 1,
    })

    expect(pets).toHaveLength(10)
  })

  it('should be able to search pets only by city of the organization and energy level of pet', async () => {
    for (let i = 1; i <= 10; i++) {
      await petsRepository.create({
        organizationId: createdOrganization.id,
        name: 'Doguinho',
        description: 'Its a beautiful dog',
        age: 'ADULT',
        size: 'SMALL',
        energy_level: 3,
        independency_level: 'LOW',
      })
    }

    const { pets } = await sut.execute({
      queryParams: {
        city: 9751,
        energy_level: 3,
      },
      page: 1,
    })

    expect(pets).toHaveLength(10)
  })

  it('should be able to search pets only by city of the organization and independency level of pet', async () => {
    for (let i = 1; i <= 10; i++) {
      await petsRepository.create({
        organizationId: createdOrganization.id,
        name: 'Doguinho',
        description: 'Its a beautiful dog',
        age: 'ADULT',
        size: 'SMALL',
        energy_level: 3,
        independency_level: 'LOW',
      })
    }

    const { pets } = await sut.execute({
      queryParams: {
        city: 9751,
        independency_level: 'LOW',
      },
      page: 1,
    })

    expect(pets).toHaveLength(10)
  })

  it('should be able to search paginated pets search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        organizationId: createdOrganization.id,
        name: `Doguinho ${i}`,
        description: 'Its a beautiful dog',
        age: 'ADULT',
        size: 'SMALL',
        energy_level: 3,
        independency_level: 'LOW',
      })
    }

    const { pets } = await sut.execute({
      queryParams: {
        city: 9751,
      },
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Doguinho 21' }),
      expect.objectContaining({ name: 'Doguinho 22' }),
    ])
  })
})
