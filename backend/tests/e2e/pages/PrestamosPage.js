const { expect } = require('@playwright/test');

class PrestamosPage {

    constructor(page) {

        this.page = page;

        this.btnNuevoPrestamo = page.locator('#btn-nuevo-prestamo');

        this.cmbLibro = page.locator('#p-libro');

        this.cmbUsuario = page.locator('#p-usuario');

        this.btnGuardar = page.locator('button[type="submit"]');

        this.tabla = page.locator('#tabla-prestamos');

    }

    async abrirFormulario() {

        await this.btnNuevoPrestamo.click();

    }

    async crearPrestamo(libro, usuario) {

        await this.abrirFormulario();

        await this.cmbLibro.selectOption({ label: libro });

        await this.cmbUsuario.selectOption({ label: usuario });

        await this.btnGuardar.click();

    }

    async verificarPrestamo(libro) {

        await expect(this.tabla).toContainText(libro);

    }

    async devolverPrimerPrestamo() {

        await this.page.locator('button[data-accion="devolver"]').first().click();

    }

}

module.exports = PrestamosPage;