import config from './utils/config.js'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'

import { coursesRouter } from './controllers/courses.js'
import { loginRouter } from './controllers/login.js'
import { usersRouter } from './controllers/users.js'
import { unknownEndpoint, errorHandler, tokenExtractor, requestLogger } from './utils/middleware.js'
import logger from './utils/logger.js'

logger.info('connecting to', config.MONGODB_URL)

mongoose
  .connect(config.MONGODB_URL)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) =>
    logger.error('error connecting to MongoDB:', error.message)
  )

const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/user', usersRouter)
app.use('/api/courses', coursesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)
export { app }
