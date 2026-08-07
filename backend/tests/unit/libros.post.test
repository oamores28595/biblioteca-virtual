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

describe('POST /api/libros', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe crear un libro correctamente', async () => {

        db.prepare
            .mockReturnValueOnce({
                run: jest.fn().mockReturnValue({
                    lastInsertRowid: 1
                })
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue({
                    id_libro: 1,
                    titulo: 'Clean Code',
                    autor: 'Robert Martin'
                })
            });

        const response = await request(app)
            .post('/api/libros')
            .send({
                titulo: 'Clean Code',
                autor: 'Robert Martin',
                isbn: '9780132350884',
                ejemplares_totales: 5
            });

        expect(response.status).toBe(201);
        expect(response.body.titulo).toBe('Clean Code');
        expect(response.body.autor).toBe('Robert Martin');

    });

    test('Debe devolver 400 cuando falta el título', async () => {

        const response = await request(app)
            .post('/api/libros')
            .send({
                autor: 'Autor'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('titulo');

    });

    test('Debe devolver 400 cuando falta el autor', async () => {

        const response = await request(app)
            .post('/api/libros')
            .send({
                titulo: 'Libro'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('autor');

    });

    test('Debe asignar un ejemplar cuando no se envía ejemplares_totales', async () => {

        const runMock = jest.fn().mockReturnValue({
            lastInsertRowid: 2
        });

        db.prepare
            .mockReturnValueOnce({
                run: runMock
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue({
                    id_libro: 2,
                    ejemplares_totales: 1,
                    ejemplares_disponibles: 1
                })
            });

        const response = await request(app)
            .post('/api/libros')
            .send({
                titulo: 'Libro',
                autor: 'Autor'
            });

        expect(response.status).toBe(201);

        expect(runMock).toHaveBeenCalledWith(
            'Libro',
            'Autor',
            null,
            null,
            null,
            null,
            null,
            1,
            1
        );

    });

    test('Debe aceptar ISBN nulo', async () => {

        db.prepare
            .mockReturnValueOnce({
                run: jest.fn().mockReturnValue({
                    lastInsertRowid: 3
                })
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue({
                    id_libro: 3,
                    isbn: null
                })
            });

        const response = await request(app)
            .post('/api/libros')
            .send({
                titulo: 'Libro',
                autor: 'Autor'
            });

        expect(response.status).toBe(201);
        expect(response.body.isbn).toBeNull();

    });

    test('Debe devolver 409 cuando el ISBN ya existe', async () => {

        db.prepare.mockReturnValue({
            run: jest.fn(() => {
                throw new Error('UNIQUE constraint failed');
            })
        });

        const response = await request(app)
            .post('/api/libros')
            .send({
                titulo: 'Libro',
                autor: 'Autor',
                isbn: '123456'
            });

        expect(response.status).toBe(409);
        expect(response.body.error).toContain('ISBN');

    });

    test('Debe devolver 500 cuando ocurre un error inesperado', async () => {

        db.prepare.mockReturnValue({
            run: jest.fn(() => {
                throw new Error('Database offline');
            })
        });

        const response = await request(app)
            .post('/api/libros')
            .send({
                titulo: 'Libro',
                autor: 'Autor'
            });

        expect(response.status).toBe(500);
        expect(response.body.error).toContain('Error');

    });

    test('Debe llamar a db.prepare dos veces al crear un libro', async () => {

        db.prepare
            .mockReturnValueOnce({
                run: jest.fn().mockReturnValue({
                    lastInsertRowid: 10
                })
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue({
                    id_libro: 10
                })
            });

        await request(app)
            .post('/api/libros')
            .send({
                titulo: 'Node.js',
                autor: 'OpenJS'
            });

        expect(db.prepare).toHaveBeenCalledTimes(2);

    });

});
