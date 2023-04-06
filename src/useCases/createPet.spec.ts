import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './createPet'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/InMemoryPetsRepository'

let petsRepository: IPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository([])
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      organization_id: 'SOME ID',
      name: 'Doguinho',
      description: 'Its a beautiful dog',
      age: 'ADULT',
      size: 'SMALL',
      energy_level: 3,
      independency_level: 'LOW',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
