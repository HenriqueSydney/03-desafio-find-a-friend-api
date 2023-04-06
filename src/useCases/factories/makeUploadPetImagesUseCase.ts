import { LocalStorageProvider } from '@/providers/StorageProvider/implementations/LocalStorageProvider'
import { PrismaPetImagesRepository } from '@/repositories/Prisma/PrismaPetsImagesRepository'
import { UploadPetImagesUseCase } from '../uploadPetImages'

export function makeUploadPetImagesUseCase() {
  const petImagesRepository = new PrismaPetImagesRepository()
  const storageProvider = new LocalStorageProvider()
  const createPetUseCase = new UploadPetImagesUseCase(
    petImagesRepository,
    storageProvider,
  )

  return createPetUseCase
}
