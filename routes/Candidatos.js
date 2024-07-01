const express = require('express');
const router = express.Router();
const Candidato = require('../models/Candidato');

// Obtener todos los candidatos
router.get('/', async (req, res) => {
  try {
    const candidatos = await Candidato.find();
    res.json(candidatos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un candidato por ID
router.get('/:id', async (req, res) => {
  try {
    const candidato = await Candidato.findById(req.params.id);
    if (!candidato) {
      return res.status(404).json({ message: 'Candidato no encontrado' });
    }
    res.json(candidato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo candidato
router.post('/', async (req, res) => {
  const candidato = new Candidato(req.body);
  try {
    const nuevoCandidato = await candidato.save();
    res.status(201).json(nuevoCandidato);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un candidato por ID
router.put('/:id', async (req, res) => {
  try {
    const candidato = await Candidato.findById(req.params.id);
    if (!candidato) {
      return res.status(404).json({ message: 'Candidato no encontrado' });
    }

    Object.assign(candidato, req.body);

    const candidatoActualizado = await candidato.save();
    res.json(candidatoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un candidato por ID
router.delete('/:id', async (req, res) => {
  try {
    const candidato = await Candidato.findById(req.params.id);
    if (!candidato) {
      return res.status(404).json({ message: 'Candidato no encontrado' });
    }
    await candidato.deleteOne(); // Cambia `candidato.remove()` a `candidato.deleteOne()`
    res.json({ message: 'Candidato eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
