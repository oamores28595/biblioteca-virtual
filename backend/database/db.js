// ============================================================
// Conexión a la base de datos SQLite
// ============================================================
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'biblioteca.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

const dbExisted = fs.existsSync(DB_PATH);

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Ejecuta el esquema siempre (usa IF NOT EXISTS, así que es seguro repetirlo)
const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

if (!dbExisted) {
    console.log('📚 Base de datos creada por primera vez en:', DB_PATH);
}

module.exports = db;
