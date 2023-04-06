import { randomUUID } from 'node:crypto'
import { Prisma, Pet, Organization } from '@prisma/client'
import { IPetsRepository, ISearchPetQueryParams } from '../IPetsRepository'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  constructor(private organizations: Organization[]) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      organizationId: data.organizationId as string,
      name: data.name,
      description: data.description,
      age: data.age,
      energy_level: data.energy_level,
      size: data.size,
      independency_level: data.independency_level,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async searchPets(
    queries: ISearchPetQueryParams,
    page: number,
  ): Promise<Pet[]> {
    const organizationsIdInTheCityQuery: string[] = []

    this.organizations.forEach((organization) => {
      if (organization.city === queries.city) {
        organizationsIdInTheCityQuery.push(organization.id)
      }
    })

    const pets = this.items
      .filter((item) => {
        if (
          item.organizationId === null ||
          !organizationsIdInTheCityQuery.includes(item.organizationId)
        ) {
          return false
        }

        if (queries.age && queries.age !== item.age) {
          return false
        }

        if (
          queries.energy_level &&
          queries.energy_level !== item.energy_level
        ) {
          return false
        }

        if (
          queries.independency_level &&
          queries.independency_level !== item.independency_level
        ) {
          return false
        }

        if (queries.size && queries.size !== item.size) {
          return false
        }

        return item
      })
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async getPetById(petId: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }
}
