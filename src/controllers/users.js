import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user.js'
import { validateUser } from '../schemas/users.js'
import { userExtractor } from '../utils/middleware.js'

const usersRouter = express.Router()

usersRouter.post('/', async (request, response) => {
  const result = validateUser(request.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return response.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { username, name, password, codigo_estudiantil } = request.body

  if (!password) {
    return response.status(400).json({
      error: 'password required'
    })
  } else if (password.length < 7) {
    return response.status(400).send({ error: 'password length less than 7' })
  }

  if (!codigo_estudiantil) {
    return response.status(400).json({
      error: 'codigo estudiantil required'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    codigo_estudiantil,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', userExtractor, async (request, response) => {
  const user = request.user
  const username = user.username
  const users = await User.find({ username }).populate('courses')

  response.json(users)
})

export { usersRouter }
