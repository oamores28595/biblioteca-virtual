const { test, expect } = require('@playwright/test');

const HomePage = require('./pages/HomePage');
const LibrosPage = require('./pages/LibrosPage');

test.describe('Módulo Libros', () => {

    test.beforeEach(async ({ page }) => {

        const home = new HomePage(page);

        await home.abrir();

        await home.irCatalogo();

    });

    test('Escenario 1 - Registrar un libro', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.crearLibro(
            'Playwright Testing 2',
            'Orlando Amores',
            '123456',
            '2026'
        );

        await libros.verificarLibro('Playwright Testing 2');

    });

    test('Escenario 2 - Buscar libro existente', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.buscarLibro('Playwright');

        await libros.verificarLibro('Playwright Testing 2');

    });

    test('Escenario 3 - Buscar libro inexistente', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.buscarLibro('xxxxxxxxxxxxxxxx');

        await libros.verificarMensajeSinResultados();

    });

    test('Escenario 4 - Editar un libro', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.editarPrimerLibro(
            'Playwright Testing Actualizado'
        );

        await libros.verificarLibro(
            'Playwright Testing Actualizado'
        );

    });

    test('Escenario 5 - Eliminar un libro', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.eliminarPrimerLibro();

        await libros.verificarLibroNoExiste(
            'Playwright Testing Actualizado'
        );

    });
       test('Escenario 6 - Buscar libro existente', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.buscarLibro('1984');

        await libros.verificarLibro('1984');

    });
           test('Escenario 7 - Encontrar libro existente', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.buscarLibro('Clean Code');

        await libros.verificarLibro('Clean Code');

    });
        test('Escenario 8 - Registrar un libro', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.crearLibro(
            'ejemplo 1',
            'Orlando Amores',
            '789456',
            '2026'
        );

        await libros.verificarLibro('ejemplo 1');

    });
        test('Escenario 9 - Registrar un libro', async ({ page }) => {

        const libros = new LibrosPage(page);

        await libros.crearLibro(
            'Andre Gabriel',
            'Orlando Amores',
            '895645',
            '2026'
        );

        await libros.verificarLibro('Andre Gabriel');

    });

});