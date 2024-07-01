const mongoose = require('mongoose');

const procesoSeleccionSchema = new mongoose.Schema({
  id_proceso: String,
  fecha_inicio: Date,
  fecha_fin: Date,
  estado_proceso: String,
  etapa: String,
  puesto_trabajo: {
    id_puesto_trabajo: String,
    titulo: String,
    area: String,
    dependencia: String,
    descripcion: String,
    competencias_especificas: {
      educacion_titulacion: [String],
      conocimientos_tecnicos: [String],
      experiencia_laboral: [String]
    }
  }
});

module.exports = mongoose.model('ProcesoSeleccion', procesoSeleccionSchema);
