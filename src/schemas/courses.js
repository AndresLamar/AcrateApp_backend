import z from 'zod'

const horarioSchema = z.object({
  dia: z.string({
    required_error: 'Día is required.'
  }),
  horainicio: z.string({
    required_error: 'Hora de inicio is required.'
  }),
  horafin: z.string({
    required_error: 'Hora de finalización is required.'
  })
})

// const parcialesSchema = z.object({
//   parcial_1: z.date(),
//   parcial_2: z.date()
// })

const courseSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required.'
  }),
  semestre: z.number({
    invalid_type_error: 'Semestre must be a number',
    required_error: 'Semestre is required.'
  }).int().min(1).max(10),
  nombre_profesor: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required.'
  }),
  aula: z.string(),
  nota_corte_1: z.number().min(0.0).max(5.0),
  nota_corte_2: z.number().min(0.0).max(5.0),
  horario: horarioSchema
  // programacion_parciales: parcialesSchema
})

export function validateCourse (input) {
  return courseSchema.safeParse(input)
}
