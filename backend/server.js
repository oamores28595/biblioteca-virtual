// ============================================================
// Biblioteca Virtual — Servidor principal (Express + SQLite)
// ============================================================
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./database/db'); // inicializa la base de datos y el esquema

const librosRouter = require('./routes/libros');
const usuariosRouter = require('./routes/usuarios');
const prestamosRouter = require('./routes/prestamos');
const categoriasRouter = require('./routes/categorias');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- API REST ---
app.use('/api/libros', librosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/prestamos', prestamosRouter);
app.use('/api/categorias', categoriasRouter);

app.get('/api/salud', (req, res) => {
    res.json({ estado: 'ok', mensaje: 'API de Biblioteca Virtual funcionando correctamente' });
});

// --- Frontend estático ---
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Manejo de rutas de API no encontradas
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Ruta de API no encontrada' });
});

app.listen(PORT, () => {
    console.log('============================================');
    console.log('  📚  Biblioteca Virtual — Servidor activo');
    console.log(`  🌐  http://localhost:${PORT}`);
    console.log('============================================');
});
