import { AppError } from '@/errors/AppError'

export class OrganizationAlreadyExistsError extends AppError {
  constructor() {
    super('E-mail already exists!', 409)
  }
}
