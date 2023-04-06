import { PetImage, Prisma } from '@prisma/client'

export interface IPetsImagesRepository {
  create(data: Prisma.PetImageUncheckedCreateInput): Promise<PetImage>
  findByPetId(petId: string): Promise<PetImage[]>
  delete(petId: string): Promise<void>
}
