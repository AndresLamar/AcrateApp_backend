import logger from './logger.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  request.token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  request.user = null
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  request.user = await User.findById(decodedToken.id)

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

export {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
