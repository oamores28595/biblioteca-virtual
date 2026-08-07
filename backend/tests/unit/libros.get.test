const request = require('supertest');
const express = require('express');

jest.mock('../database/db', () => ({
    prepare: jest.fn()
}));

const db = require('../database/db');
const librosRouter = require('../routes/libros');

const app = express();
app.use(express.json());
app.use('/api/libros', librosRouter);

describe('GET /api/libros', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe devolver todos los libros', async () => {

        const libros = [
            {
                id_libro: 1,
                titulo: 'El Quijote',
                autor: 'Miguel de Cervantes',
                isbn: '123456',
                categoria_nombre: 'Novela',
                ejemplares_disponibles: 3
            },
            {
                id_libro: 2,
                titulo: 'Cien años de soledad',
                autor: 'Gabriel García Márquez',
                isbn: '987654',
                categoria_nombre: 'Realismo mágico',
                ejemplares_disponibles: 5
            }
        ];

        db.prepare.mockReturnValue({
            all: jest.fn().mockReturnValue(libros)
        });

        const response = await request(app)
            .get('/api/libros');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].titulo).toBe('El Quijote');

    });

    test('Debe buscar libros por título', async () => {

        db.prepare.mockReturnValue({
            all: jest.fn().mockReturnValue([
                { titulo: 'JavaScript Moderno' }
            ])
        });

        const response = await request(app)
            .get('/api/libros?q=JavaScript');

        expect(response.status).toBe(200);
        expect(response.body[0].titulo).toContain('JavaScript');

    });

    test('Debe buscar libros por autor', async () => {

        db.prepare.mockReturnValue({
            all: jest.fn().mockReturnValue([
                { autor: 'Gabriel García Márquez' }
            ])
        });

        const response = await request(app)
            .get('/api/libros?q=Gabriel');

        expect(response.status).toBe(200);

    });

    test('Debe buscar libros por ISBN', async () => {

        db.prepare.mockReturnValue({
            all: jest.fn().mockReturnValue([
                { isbn: '111222333' }
            ])
        });

        const response = await request(app)
            .get('/api/libros?q=111222333');

        expect(response.status).toBe(200);

    });

    test('Debe filtrar libros por categoría', async () => {

        db.prepare.mockReturnValue({
            all: jest.fn().mockReturnValue([
                {
                    categoria_nombre: 'Historia'
                }
            ])
        });

        const response = await request(app)
            .get('/api/libros?categoria=Historia');

        expect(response.status).toBe(200);
        expect(response.body[0].categoria_nombre).toBe('Historia');

    });

    test('Debe devolver únicamente libros disponibles', async () => {

        db.prepare.mockReturnValue({
            all: jest.fn().mockReturnValue([
                {
                    titulo: 'Libro disponible',
                    ejemplares_disponibles: 4
                }
            ])
        });

        const response = await request(app)
            .get('/api/libros?disponibles=true');

        expect(response.status).toBe(200);
        expect(response.body[0].ejemplares_disponibles).toBeGreaterThan(0);

    });

    test('Debe devolver un arreglo vacío cuando no existen resultados', async () => {

        db.prepare.mockReturnValue({
            all: jest.fn().mockReturnValue([])
        });

        const response = await request(app)
            .get('/api/libros?q=LibroInexistente');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);

    });

});
