import { IOrganizationRepository } from '@/repositories/IOrganizationsRepository'
import { OrganizationAlreadyExistsError } from './errors/OrganizationAlreadyExistsError'
import { hash } from 'bcryptjs'
import { Organization } from '@prisma/client'

interface IRegisterOrganizationRequest {
  name: string
  owner_name: string
  email: string
  password: string
  phone: string
  zip_code: number
  state: string
  city: number
  address: string
}

interface IRegisterOrganizationResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationRepository) {}

  async execute({
    name,
    owner_name,
    email,
    password,
    phone,
    zip_code,
    state,
    city,
    address,
  }: IRegisterOrganizationRequest): Promise<IRegisterOrganizationResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findOrganizationByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      owner_name,
      email,
      password_hash,
      phone,
      zip_code,
      state,
      city,
      address,
    })

    return { organization }
  }
}
