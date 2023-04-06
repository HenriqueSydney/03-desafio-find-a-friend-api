import { IStorageProvider } from '@/providers/StorageProvider/IStorageProvider'
import { IPetsImagesRepository } from '@/repositories/IPetsImageRepository'

interface IRequest {
  petId: string
  imagesName: string[]
}

export class UploadPetImagesUseCase {
  constructor(
    private petsImagesRepository: IPetsImagesRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ petId, imagesName }: IRequest): Promise<void> {
    const savedPetsImages = await this.petsImagesRepository.findByPetId(petId)

    if (savedPetsImages) {
      savedPetsImages.map(async (savedPetsImage) => {
        await this.storageProvider.delete(savedPetsImage.image_name, 'pets')
      })
    }

    await this.petsImagesRepository.delete(petId)

    imagesName.map(async (image) => {
      await this.petsImagesRepository.create({
        petId,
        image_name: image,
      })
      await this.storageProvider.save(image, 'pets')
    })
  }
}
