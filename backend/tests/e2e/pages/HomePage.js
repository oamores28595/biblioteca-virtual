const { expect } = require('@playwright/test');

class HomePage {

    constructor(page) {
        this.page = page;

        this.tabPanel = page.locator('[data-view="panel"]');
        this.tabCatalogo = page.locator('[data-view="catalogo"]');
        this.tabPrestamos = page.locator('[data-view="prestamos"]');
        this.tabUsuarios = page.locator('[data-view="usuarios"]');

        this.btnNuevoLibro = page.locator('#btn-nuevo-libro');
        this.btnNuevoPrestamo = page.locator('#btn-nuevo-prestamo');
        this.btnNuevoUsuario = page.locator('#btn-nuevo-usuario');
    }

    async abrir() {
        await this.page.goto('http://localhost:3000');
    }

    async irCatalogo() {
        await this.tabCatalogo.click();
    }

    async irPrestamos() {
        await this.tabPrestamos.click();
    }

    async irUsuarios() {
        await this.tabUsuarios.click();
    }

    async irPanel() {
        await this.tabPanel.click();
    }

    async verificarCarga() {
        await expect(this.btnNuevoLibro).toBeVisible();
    }

}

module.exports = HomePage;
