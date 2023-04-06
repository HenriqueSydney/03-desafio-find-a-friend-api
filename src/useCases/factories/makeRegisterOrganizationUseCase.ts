import { PrismaOrganizationsRepository } from '@/repositories/Prisma/PrismaOrganizationsRepository'
import { RegisterOrganizationUseCase } from '../registerOrganization'

export function makeRegisterOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    organizationsRepository,
  )

  return registerOrganizationUseCase
}
