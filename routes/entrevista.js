const express = require('express');
const router = express.Router();
const Entrevista = require('../models/Entrevista');

// Obtener todas las entrevistas
router.get('/', async (req, res) => {
  try {
    const entrevistas = await Entrevista.find();
    res.json(entrevistas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una entrevista por ID
router.get('/:id', async (req, res) => {
  try {
    const entrevista = await Entrevista.findById(req.params.id);
    if (!entrevista) {
      return res.status(404).json({ message: 'Entrevista no encontrada' });
    }
    res.json(entrevista);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva entrevista
router.post('/', async (req, res) => {
  const entrevista = new Entrevista(req.body);
  try {
    const nuevaEntrevista = await entrevista.save();
    res.status(201).json(nuevaEntrevista);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una entrevista por ID
router.put('/:id', async (req, res) => {
  try {
    const entrevista = await Entrevista.findById(req.params.id);
    if (!entrevista) {
      return res.status(404).json({ message: 'Entrevista no encontrada' });
    }

    Object.assign(entrevista, req.body);

    const entrevistaActualizada = await entrevista.save();
    res.json(entrevistaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una entrevista por ID
router.delete('/:id', async (req, res) => {
  try {
    const entrevista = await Entrevista.findById(req.params.id);
    if (!entrevista) {
      return res.status(404).json({ message: 'Entrevista no encontrada' });
    }
    await entrevista.deleteOne(); // Cambia `entrevista.remove()` a `entrevista.deleteOne()`
    res.json({ message: 'Entrevista eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
