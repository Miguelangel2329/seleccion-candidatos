const mongoose = require('mongoose');

const puestosTrabajoSchema = new mongoose.Schema({
  Titulo: String,
  Departamento: String,
  Descripcion: String,
  Requisitos: [String],
  CandidatosAplicados: [String]
});

module.exports = mongoose.model('PuestosTrabajo', puestosTrabajoSchema);
