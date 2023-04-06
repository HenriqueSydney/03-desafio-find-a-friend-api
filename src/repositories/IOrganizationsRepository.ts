import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findOrganizationByEmail(email: string): Promise<Organization | null>
}
