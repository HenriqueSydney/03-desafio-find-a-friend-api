import { PrismaPetsRepository } from '@/repositories/Prisma/PrismaPetsRepository'
import { CreatePetUseCase } from '../createPet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(petsRepository)

  return createPetUseCase
}
