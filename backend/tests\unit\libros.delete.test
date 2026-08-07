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

describe('DELETE /api/libros/:id', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe eliminar un libro existente', async () => {

        db.prepare.mockReturnValue({
            run: jest.fn().mockReturnValue({
                changes: 1
            })
        });

        const response = await request(app)
            .delete('/api/libros/1');

        expect(response.status).toBe(204);
        expect(response.text).toBe('');

    });

    test('Debe responder 404 cuando el libro no existe', async () => {

        db.prepare.mockReturnValue({
            run: jest.fn().mockReturnValue({
                changes: 0
            })
        });

        const response = await request(app)
            .delete('/api/libros/999');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Libro no encontrado');

    });

    test('Debe llamar a run() una sola vez', async () => {

        const runMock = jest.fn().mockReturnValue({
            changes: 1
        });

        db.prepare.mockReturnValue({
            run: runMock
        });

        await request(app)
            .delete('/api/libros/10');

        expect(runMock).toHaveBeenCalledTimes(1);

    });

    test('Debe enviar el id correcto al método run()', async () => {

        const runMock = jest.fn().mockReturnValue({
            changes: 1
        });

        db.prepare.mockReturnValue({
            run: runMock
        });

        await request(app)
            .delete('/api/libros/25');

        expect(runMock).toHaveBeenCalledWith('25');

    });

    test('Debe llamar a db.prepare() una vez durante la eliminación', async () => {

        db.prepare.mockReturnValue({
            run: jest.fn().mockReturnValue({
                changes: 1
            })
        });

        await request(app)
            .delete('/api/libros/8');

        expect(db.prepare).toHaveBeenCalledTimes(1);
        expect(db.prepare).toHaveBeenCalledWith(
            'DELETE FROM libros WHERE id_libro = ?'
        );

    });

});
