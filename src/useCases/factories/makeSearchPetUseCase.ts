import { PrismaPetsRepository } from '@/repositories/Prisma/PrismaPetsRepository'
import { SearchPetsUseCase } from '../searchPets'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetUseCase = new SearchPetsUseCase(petsRepository)

  return searchPetUseCase
}
