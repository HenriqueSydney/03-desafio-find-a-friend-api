import { PrismaOrganizationsRepository } from '@/repositories/Prisma/PrismaOrganizationsRepository'
import { AuthenticateOrganizationUseCase } from '../authenticateOrganization'

export function makeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository,
  )

  return authenticateOrganizationUseCase
}
