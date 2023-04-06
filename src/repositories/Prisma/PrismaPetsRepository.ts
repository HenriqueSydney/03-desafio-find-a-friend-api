import { Prisma, Pet } from '@prisma/client'
import { IPetsRepository, ISearchPetQueryParams } from '../IPetsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async searchPets(
    queries: ISearchPetQueryParams,
    page: number,
  ): Promise<Pet[]> {
    const whereParams = {
      Organization: {
        city: queries.city,
      },
    }

    if (queries.age) {
      Object.assign(whereParams, { age: queries.age })
    }

    if (queries.energy_level) {
      Object.assign(whereParams, { energy_level: queries.energy_level })
    }

    if (queries.independency_level) {
      Object.assign(whereParams, { size: queries.size })
    }

    if (queries.independency_level) {
      Object.assign(whereParams, {
        independency_level: queries.independency_level,
      })
    }

    const pets = await prisma.pet.findMany({
      where: whereParams,
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async getPetById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id: petId } })

    return pet
  }
}
