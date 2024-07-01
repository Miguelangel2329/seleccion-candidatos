const mongoose = require('mongoose');

const candidatoSchema = new mongoose.Schema({
  datos_postulante: {
    nombres: String,
    apellido1: String,
    apellido2: String
  },
  ubicacion: {
    departamento: String,
    provincia: String,
    distrito: String,
    direccion: String
  },
  contacto: {
    email: String,
    telefono: String
  },
  historial_laboral: [
    {
      empresa: String,
      cargo: String,
      fechaInicio: Date,
      fechaFin: Date,
      descripcion: String
    }
  ],
  educacion: [
    {
      institucion: String,
      grado: String,
      carrera: String,
      fecha_Graduacion: Date
    }
  ],
  habilidades: [String],
  certificaciones: [
    {
      nombre: String,
      fecha_Obtencion: Date
    }
  ]
});

module.exports = mongoose.model('Candidato', candidatoSchema);
