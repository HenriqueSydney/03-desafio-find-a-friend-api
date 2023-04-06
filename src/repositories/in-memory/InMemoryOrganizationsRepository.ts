import { randomUUID } from 'node:crypto'
import { Prisma, Organization } from '@prisma/client'
import { IOrganizationRepository } from '../IOrganizationsRepository'

export class InMemoryOrganizationsRepository
  implements IOrganizationRepository
{
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      owner_name: data.owner_name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      zip_code: data.zip_code,
      state: data.state,
      city: data.city,
      address: data.address,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findOrganizationByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}
