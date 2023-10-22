import http from 'node:http'
import { app } from './app.js'
import config from './utils/config.js'
import logger from './utils/logger.js'

const server = http.createServer(app)
const PORT = config.PORT
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
