import { PrismaPetsRepository } from '@/repositories/Prisma/PrismaPetsRepository'
import { GetPetUseCase } from '../getPet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetUseCase = new GetPetUseCase(petsRepository)

  return getPetUseCase
}
