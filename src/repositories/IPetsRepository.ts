import { Age, IndependencyLevel, Pet, Prisma, Size } from '@prisma/client'

export interface ISearchPetQueryParams {
  city: number
  age?: Age | null
  energy_level?: number | null
  size?: Size | null
  independency_level?: IndependencyLevel | null
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchPets(queries: ISearchPetQueryParams, page: number): Promise<Pet[]>
  getPetById(petId: string): Promise<Pet | null>
}
