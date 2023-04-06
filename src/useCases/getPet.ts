import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFound'

interface IGetPetRequest {
  petId: string
}

interface IGetPetResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({ petId }: IGetPetRequest): Promise<IGetPetResponse> {
    const pet = await this.petsRepository.getPetById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
