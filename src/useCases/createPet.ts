import { IPetsRepository } from '@/repositories/IPetsRepository'
import { Age, IndependencyLevel, Pet, Size } from '@prisma/client'

interface IRequestCreatePetUseCase {
  organization_id: string
  name: string
  description: string
  age: Age
  size: Size
  independency_level: IndependencyLevel
  energy_level: number
}
interface IResponseCreatePetUseCase {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    organization_id,
    name,
    description,
    age,
    size,
    energy_level,
    independency_level,
  }: IRequestCreatePetUseCase): Promise<IResponseCreatePetUseCase> {
    const pet = await this.petsRepository.create({
      organizationId: organization_id,
      name,
      description,
      age,
      size,
      energy_level,
      independency_level,
    })

    return { pet }
  }
}
