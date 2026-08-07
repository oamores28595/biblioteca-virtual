const { expect } = require('@playwright/test');

class UsuariosPage {

    constructor(page) {

        this.page = page;

        this.btnNuevoUsuario = page.locator('#btn-nuevo-usuario');

        this.txtNombre = page.locator('#u-nombre');

        this.txtCorreo = page.locator('#u-correo');

        this.txtTelefono = page.locator('#u-telefono');

        this.btnGuardar = page.locator('button[type="submit"]');

        this.tarjetasUsuarios = page.locator('.reader-card');

    }

    async abrirFormulario() {

        await this.btnNuevoUsuario.click();

    }

    async crearUsuario(nombre, correo, telefono) {

        await this.abrirFormulario();

        await this.txtNombre.fill(nombre);

        await this.txtCorreo.fill(correo);

        await this.txtTelefono.fill(telefono);

        await this.btnGuardar.click();

    }

    async verificarUsuario(nombre) {

        await expect(this.tarjetasUsuarios).toContainText(nombre);

    }

}

module.exports = UsuariosPage;