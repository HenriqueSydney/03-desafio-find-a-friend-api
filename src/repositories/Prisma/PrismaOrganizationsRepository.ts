import { Prisma, Organization } from '@prisma/client'
import { IOrganizationRepository } from '../IOrganizationsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements IOrganizationRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({ data })

    return organization
  }

  async findOrganizationByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { email },
    })

    return organization
  }
}
