import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/user.js'
import { validateUser } from '../schemas/users.js'

const usersRouter = express.Router()

usersRouter.post('/', async (request, response) => {
  const result = validateUser(request.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return response.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).json({
      error: 'password required'
    })
  } else if (password.length < 7) {
    return response.status(400).send({ error: 'password length less than 7' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('courses')

  response.json(users)
})

export { usersRouter }
