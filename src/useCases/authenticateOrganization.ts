import { IOrganizationRepository } from '@/repositories/IOrganizationsRepository'
import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateUseCaseResponse {
  organization: Organization
}
export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findOrganizationByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
