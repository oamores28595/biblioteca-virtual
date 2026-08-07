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

describe('PUT /api/libros/:id', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe actualizar un libro existente', async () => {

        const libroOriginal = {
            id_libro: 1,
            titulo: 'Libro viejo',
            autor: 'Autor viejo',
            isbn: '111',
            anio_publicacion: 2020,
            id_categoria: 1,
            sinopsis: 'Sinopsis',
            portada_url: null,
            ejemplares_totales: 5
        };

        const libroActualizado = {
            ...libroOriginal,
            titulo: 'Libro actualizado',
            autor: 'Nuevo autor'
        };

        db.prepare
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libroOriginal)
            })
            .mockReturnValueOnce({
                run: jest.fn().mockReturnValue({ changes: 1 })
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libroActualizado)
            });

        const response = await request(app)
            .put('/api/libros/1')
            .send({
                titulo: 'Libro actualizado',
                autor: 'Nuevo autor'
            });

        expect(response.status).toBe(200);
        expect(response.body.titulo).toBe('Libro actualizado');
        expect(response.body.autor).toBe('Nuevo autor');

    });

    test('Debe responder 404 cuando el libro no existe', async () => {

        db.prepare.mockReturnValue({
            get: jest.fn().mockReturnValue(undefined)
        });

        const response = await request(app)
            .put('/api/libros/999')
            .send({
                titulo: 'Nuevo'
            });

        expect(response.status).toBe(404);
        expect(response.body.error).toContain('Libro no encontrado');

    });

    test('Debe conservar los datos que no fueron enviados', async () => {

        const libro = {
            id_libro: 2,
            titulo: 'Original',
            autor: 'Autor',
            isbn: 'ABC123',
            anio_publicacion: 2018,
            id_categoria: 1,
            sinopsis: 'Texto',
            portada_url: null,
            ejemplares_totales: 10
        };

        db.prepare
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libro)
            })
            .mockReturnValueOnce({
                run: jest.fn()
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libro)
            });

        const response = await request(app)
            .put('/api/libros/2')
            .send({
                titulo: 'Original'
            });

        expect(response.status).toBe(200);
        expect(response.body.autor).toBe('Autor');
        expect(response.body.isbn).toBe('ABC123');

    });

    test('Debe ejecutar UPDATE sobre la base de datos', async () => {

        const libro = {
            id_libro: 5,
            titulo: 'Libro',
            autor: 'Autor',
            isbn: '123',
            anio_publicacion: 2022,
            id_categoria: 1,
            sinopsis: '',
            portada_url: '',
            ejemplares_totales: 2
        };

        const runMock = jest.fn();

        db.prepare
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libro)
            })
            .mockReturnValueOnce({
                run: runMock
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libro)
            });

        await request(app)
            .put('/api/libros/5')
            .send({
                titulo: 'Libro'
            });

        expect(runMock).toHaveBeenCalled();

    });

    test('Debe llamar tres veces a db.prepare durante la actualización', async () => {

        const libro = {
            id_libro: 3,
            titulo: 'Libro',
            autor: 'Autor',
            isbn: '123',
            anio_publicacion: 2021,
            id_categoria: 2,
            sinopsis: '',
            portada_url: '',
            ejemplares_totales: 1
        };

        db.prepare
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libro)
            })
            .mockReturnValueOnce({
                run: jest.fn()
            })
            .mockReturnValueOnce({
                get: jest.fn().mockReturnValue(libro)
            });

        await request(app)
            .put('/api/libros/3')
            .send({
                titulo: 'Libro'
            });

        expect(db.prepare).toHaveBeenCalledTimes(3);

    });

});
