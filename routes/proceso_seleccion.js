const express = require('express');
const router = express.Router();
const ProcesoSeleccion = require('../models/ProcesoSeleccion');

// Obtener todos los procesos de selección
router.get('/', async (req, res) => {
  try {
    const procesosSeleccion = await ProcesoSeleccion.find();
    res.json(procesosSeleccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un proceso de selección por ID
router.get('/:id', async (req, res) => {
  try {
    const procesoSeleccion = await ProcesoSeleccion.findById(req.params.id);
    if (!procesoSeleccion) {
      return res.status(404).json({ message: 'Proceso de selección no encontrado' });
    }
    res.json(procesoSeleccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo proceso de selección
router.post('/', async (req, res) => {
  const procesoSeleccion = new ProcesoSeleccion(req.body);
  try {
    const nuevoProcesoSeleccion = await procesoSeleccion.save();
    res.status(201).json(nuevoProcesoSeleccion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un proceso de selección por ID
router.put('/:id', async (req, res) => {
  try {
    const procesoSeleccion = await ProcesoSeleccion.findById(req.params.id);
    if (!procesoSeleccion) {
      return res.status(404).json({ message: 'Proceso de selección no encontrado' });
    }

    Object.assign(procesoSeleccion, req.body);

    const procesoSeleccionActualizado = await procesoSeleccion.save();
    res.json(procesoSeleccionActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un proceso de selección por ID
router.delete('/:id', async (req, res) => {
  try {
    const procesoSeleccion = await ProcesoSeleccion.findById(req.params.id);
    if (!procesoSeleccion) {
      return res.status(404).json({ message: 'Proceso de selección no encontrado' });
    }
    await procesoSeleccion.deleteOne(); // Cambia `procesoSeleccion.remove()` a `procesoSeleccion.deleteOne()`
    res.json({ message: 'Proceso de selección eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
