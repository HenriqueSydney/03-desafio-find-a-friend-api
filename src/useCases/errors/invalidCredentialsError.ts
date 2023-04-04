import { AppError } from '@/errors/AppError'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Invalid Credentials', 400)
  }
}
