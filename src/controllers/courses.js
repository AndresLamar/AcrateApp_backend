import { userExtractor } from '../utils/middleware.js'
import express from 'express'
import { Course } from '../models/course.js'
import { validateCourse } from '../schemas/courses.js'

const coursesRouter = express.Router()

coursesRouter.get('/', async (request, response) => {
  const courses = await Course.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(courses)
})

coursesRouter.post('/', userExtractor, async (request, response, next) => {
  const result = validateCourse(request.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return response.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { nombre, semestre, nombre_profesor, aula, nota_corte_1, nota_corte_2, horario, programacion_parciales } = request.body
  const user = request.user

  const nota_final = (nota_corte_1 + nota_corte_2) / 2

  // const fechaParcial1 = new Date(programacion_parciales.parcial_1)
  // const fechaParcial2 = new Date(programacion_parciales.parcial_2)

  console.log(nota_final)

  const course = new Course({
    nombre,
    semestre,
    nombre_profesor,
    aula,
    nota_corte_1,
    nota_corte_2,
    nota_final,
    horario: {
      dia: horario.dia,
      horainicio: horario.horainicio,
      horafin: horario.horafin
    },
    programacion_parciales: {
      parcial_1: programacion_parciales.parcial_1,
      parcial_2: programacion_parciales.parcial_2
    },
    user: user._id

  })

  const savedCourse = await course.save()
  user.courses = user.courses.concat(savedCourse._id)
  await user.save()

  response.json(savedCourse)
})

export { coursesRouter }
