import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

// console.log(process.env.PORT)

const MONGODB_URL = process.env.MONGODB_URI

export default {
  MONGODB_URL,
  PORT
}
