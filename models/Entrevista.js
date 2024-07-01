const mongoose = require('mongoose');

const entrevistaSchema = new mongoose.Schema({
  Departamento: String,
  Descripcion: String,
  Requisitos: [String],
  CandidatosAplicados: [String],
  Fecha_de_Entrevista: Date
});

module.exports = mongoose.model('Entrevista', entrevistaSchema);
