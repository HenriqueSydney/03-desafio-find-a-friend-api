import { PetImage, Prisma } from '@prisma/client'
import { IPetsImagesRepository } from '../IPetsImageRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPetImagesRepository implements IPetsImagesRepository {
  async create(data: Prisma.PetImageUncheckedCreateInput): Promise<PetImage> {
    const petImage = await prisma.petImage.create({ data })

    return petImage
  }

  async findByPetId(petId: string): Promise<PetImage[]> {
    const petImages = await prisma.petImage.findMany({ where: { petId } })

    return petImages
  }

  async delete(petId: string): Promise<void> {
    await prisma.petImage.deleteMany({ where: { petId } })
  }
}
