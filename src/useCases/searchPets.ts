import { Pet } from '@prisma/client'
import { ISearchPetQueryParams } from '../repositories/IPetsRepository'
import { IPetsRepository } from '@/repositories/IPetsRepository'

interface ISearchPetsRequest {
  queryParams: ISearchPetQueryParams
  page: number
}

interface ISearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    queryParams,
    page,
  }: ISearchPetsRequest): Promise<ISearchPetsResponse> {
    const pets = await this.petsRepository.searchPets(queryParams, page)

    return { pets }
  }
}
