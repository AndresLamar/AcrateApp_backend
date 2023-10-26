import z from 'zod'

const userSchema = z.object({
  username: z.number({
    invalid_type_error: 'Username must be a number',
    required_error: 'Username is required.'
  }).int().min(999999).max(9999999999),
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required.'
  }),
  password: z.string(),
  codigo_estudiantil: z.string({
    required_error: 'codigo estudiantil is required.'
  })
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}
