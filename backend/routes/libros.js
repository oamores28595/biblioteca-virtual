// ============================================================
// Rutas: /api/libros
// ============================================================
const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET /api/libros  → listar todos (con filtros opcionales: q, categoria, disponibles)
router.get('/', (req, res) => {
    const { q, categoria, disponibles } = req.query;

    let sql = `
        SELECT l.*, c.nombre AS categoria_nombre
        FROM libros l
        LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
        WHERE 1 = 1
    `;
    const params = [];

    if (q) {
        sql += ` AND (l.titulo LIKE ? OR l.autor LIKE ? OR l.isbn LIKE ?)`;
        const like = `%${q}%`;
        params.push(like, like, like);
    }
    if (categoria) {
        sql += ` AND c.nombre = ?`;
        params.push(categoria);
    }
    if (disponibles === 'true') {
        sql += ` AND l.ejemplares_disponibles > 0`;
    }

    sql += ` ORDER BY l.titulo ASC`;

    const libros = db.prepare(sql).all(...params);
    res.json(libros);
});

// GET /api/libros/:id → detalle de un libro
router.get('/:id', (req, res) => {
    const libro = db.prepare(`
        SELECT l.*, c.nombre AS categoria_nombre
        FROM libros l LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
        WHERE l.id_libro = ?
    `).get(req.params.id);

    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libro);
});

// POST /api/libros → crear libro
router.post('/', (req, res) => {
    const { titulo, autor, isbn, anio_publicacion, id_categoria, sinopsis, portada_url, ejemplares_totales } = req.body;

    if (!titulo || !autor) {
        return res.status(400).json({ error: 'titulo y autor son obligatorios' });
    }

    const total = Number.isInteger(ejemplares_totales) && ejemplares_totales > 0 ? ejemplares_totales : 1;

    try {
        const info = db.prepare(`
            INSERT INTO libros (titulo, autor, isbn, anio_publicacion, id_categoria, sinopsis, portada_url, ejemplares_totales, ejemplares_disponibles)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(titulo, autor, isbn || null, anio_publicacion || null, id_categoria || null, sinopsis || null, portada_url || null, total, total);

        const nuevo = db.prepare('SELECT * FROM libros WHERE id_libro = ?').get(info.lastInsertRowid);
        res.status(201).json(nuevo);
    } catch (err) {
        if (err.message.includes('UNIQUE')) {
            return res.status(409).json({ error: 'Ya existe un libro con ese ISBN' });
        }
        res.status(500).json({ error: 'Error al crear el libro' });
    }
});

// PUT /api/libros/:id → actualizar libro
router.put('/:id', (req, res) => {
    const existente = db.prepare('SELECT * FROM libros WHERE id_libro = ?').get(req.params.id);
    if (!existente) return res.status(404).json({ error: 'Libro no encontrado' });

    const datos = { ...existente, ...req.body };

    db.prepare(`
        UPDATE libros SET
            titulo = ?, autor = ?, isbn = ?, anio_publicacion = ?,
            id_categoria = ?, sinopsis = ?, portada_url = ?, ejemplares_totales = ?
        WHERE id_libro = ?
    `).run(
        datos.titulo, datos.autor, datos.isbn, datos.anio_publicacion,
        datos.id_categoria, datos.sinopsis, datos.portada_url, datos.ejemplares_totales,
        req.params.id
    );

    const actualizado = db.prepare('SELECT * FROM libros WHERE id_libro = ?').get(req.params.id);
    res.json(actualizado);
});

// DELETE /api/libros/:id → eliminar libro
router.delete('/:id', (req, res) => {
    const info = db.prepare('DELETE FROM libros WHERE id_libro = ?').run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(204).send();
});

module.exports = router;
