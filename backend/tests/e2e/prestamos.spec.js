const { test } = require('@playwright/test');

const HomePage = require('./pages/HomePage');

const PrestamosPage = require('./pages/PrestamosPage');

test('Registrar préstamo', async ({ page }) => {

    const home = new HomePage(page);

    const prestamos = new PrestamosPage(page);

    await home.abrir();

    await home.irPrestamos();

    await prestamos.crearPrestamo(

        "Playwright Testing",

        "Juan Pérez"

    );

});