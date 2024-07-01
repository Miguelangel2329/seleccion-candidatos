const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Asegúrate de que dotenv se cargue antes de cualquier otro código

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Rutas
app.use('/api/candidatos', require('./routes/candidatos'));
app.use('/api/entrevista', require('./routes/entrevista'));
app.use('/api/proceso_seleccion', require('./routes/proceso_seleccion'));
app.use('/api/puestos_trabajo', require('./routes/puestos_trabajo'));

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
