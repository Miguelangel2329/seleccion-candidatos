const express = require('express');
const router = express.Router();
const PuestosTrabajo = require('../models/PuestosTrabajo');

// Obtener todos los puestos de trabajo
router.get('/', async (req, res) => {
  try {
    const puestosTrabajo = await PuestosTrabajo.find();
    res.json(puestosTrabajo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un puesto de trabajo por ID
router.get('/:id', async (req, res) => {
  try {
    const puestoTrabajo = await PuestosTrabajo.findById(req.params.id);
    if (!puestoTrabajo) {
      return res.status(404).json({ message: 'Puesto de trabajo no encontrado' });
    }
    res.json(puestoTrabajo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo puesto de trabajo
router.post('/', async (req, res) => {
  const puestoTrabajo = new PuestosTrabajo(req.body);
  try {
    const nuevoPuestoTrabajo = await puestoTrabajo.save();
    res.status(201).json(nuevoPuestoTrabajo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un puesto de trabajo por ID
router.put('/:id', async (req, res) => {
  try {
    const puestoTrabajo = await PuestosTrabajo.findById(req.params.id);
    if (!puestoTrabajo) {
      return res.status(404).json({ message: 'Puesto de trabajo no encontrado' });
    }

    Object.assign(puestoTrabajo, req.body);

    const puestoTrabajoActualizado = await puestoTrabajo.save();
    res.json(puestoTrabajoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un puesto de trabajo por ID
router.delete('/:id', async (req, res) => {
  try {
    const puestoTrabajo = await PuestosTrabajo.findById(req.params.id);
    if (!puestoTrabajo) {
      return res.status(404).json({ message: 'Puesto de trabajo no encontrado' });
    }
    await puestoTrabajo.deleteOne(); // Cambia `puestoTrabajo.remove()` a `puestoTrabajo.deleteOne()`
    res.json({ message: 'Puesto de trabajo eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
