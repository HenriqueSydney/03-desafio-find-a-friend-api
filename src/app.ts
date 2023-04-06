import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { fastifyJwt } from '@fastify/jwt'
import multer from 'fastify-multer'
// import fastifyMultipart from '@fastify/multipart'

import { env } from './env'

import { ZodError } from 'zod'
import { AppError } from './errors/AppError'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

// app.register(fastifyMultipart)

app.register(multer.contentParser)

app.register(organizationsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  console.log(error)
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO Here we should log to an external tool like DataDog/NewRelic/Rentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
