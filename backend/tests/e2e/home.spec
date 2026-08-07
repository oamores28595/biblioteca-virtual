const { test } = require('@playwright/test');

const HomePage = require('./pages/HomePage');

test('Abrir Biblioteca Virtual', async ({ page }) => {

    const home = new HomePage(page);

    await home.abrir();

    await home.verificarCarga();

});
