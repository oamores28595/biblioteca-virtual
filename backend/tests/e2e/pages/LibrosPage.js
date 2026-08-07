class LibrosPage{

    constructor(page){

        this.page=page;

        this.btnNuevoLibro=page.locator("#btn-nuevo-libro");

        this.txtTitulo=page.locator("#f-titulo");

        this.txtAutor=page.locator("#f-autor");

        this.btnGuardar=page.locator("button[type=submit]");

    }

    async abrir(){

        await this.page.goto("http://localhost:3000");

    }

    async crearLibro(titulo,autor){

        await this.btnNuevoLibro.click();

        await this.txtTitulo.fill(titulo);

        await this.txtAutor.fill(autor);

        await this.btnGuardar.click();

    }
    async editarPrimerLibro(nuevoTitulo) {

    await this.page
        .locator('button[data-accion="editar-libro"]')
        .first()
        .click();

    await this.txtTitulo.fill(nuevoTitulo);

    await this.btnGuardar.click();

}

}

module.exports=LibrosPage;