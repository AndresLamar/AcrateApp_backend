import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  semestre: {
    type: Number,
    required: true
  },
  nombre_profesor: {
    type: String,
    required: true
  },
  aula: {
    type: String
  },
  nota_corte_1: {
    type: Number,
    required: true
  },
  nota_corte_2: {
    type: Number,
    required: true
  },
  nota_final: {
    type: Number
  },
  horario: {
    dia: {
      type: String,
      required: true
    },
    horainicio: {
      type: String,
      required: true
    },
    horafin: {
      type: String,
      required: true
    }
  },
  programacion_parciales: {
    parcial_1: {
      type: String
    },
    parcial_2: {
      type: String
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Course = mongoose.model('Course', courseSchema)

export { Course }
