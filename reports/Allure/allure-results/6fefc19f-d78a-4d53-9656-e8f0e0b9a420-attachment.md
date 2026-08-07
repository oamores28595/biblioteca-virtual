# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: usuarios.spec.js >> Registrar usuario
- Location: tests\e2e\usuarios.spec.js:7:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.reader-card')
Expected substring: "Juan Pérez"
Error: strict mode violation: locator('.reader-card') resolved to 4 elements:
    1) <article class="reader-card">…</article> aka getByText('AT Ana Torres ana.torres@')
    2) <article class="reader-card">…</article> aka getByText('JP Juan Pérez juan@email.com')
    3) <article class="reader-card">…</article> aka getByText('LF Luis Fernández luis.')
    4) <article class="reader-card">…</article> aka getByText('MJ María Jiménez maria.')

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.reader-card')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e7]:
      - generic [ref=e8]: Bibliotheca
      - generic [ref=e9]: catálogo & préstamos
    - navigation [ref=e10]:
      - button "Catálogo" [ref=e11] [cursor=pointer]
      - button "Préstamos" [ref=e12] [cursor=pointer]
      - button "Lectores" [ref=e13] [cursor=pointer]
      - button "Panel" [ref=e14] [cursor=pointer]
  - main [ref=e15]:
    - generic [ref=e16]:
      - generic [ref=e17]:
        - generic [ref=e18]:
          - paragraph [ref=e19]: Comunidad de lectura
          - heading "Lectores" [level=1] [ref=e20]
        - button "+ Registrar lector" [ref=e21] [cursor=pointer]
      - generic [ref=e22]:
        - article [ref=e23]:
          - generic [ref=e24]: AT
          - heading "Ana Torres" [level=3] [ref=e25]
          - paragraph [ref=e26]: ana.torres@correo.com
          - text: Lector desde 06 ago 2026
        - article [ref=e27]:
          - generic [ref=e28]: JP
          - heading "Juan Pérez" [level=3] [ref=e29]
          - paragraph [ref=e30]: juan@email.com
          - text: Lector desde 06 ago 2026
        - article [ref=e31]:
          - generic [ref=e32]: LF
          - heading "Luis Fernández" [level=3] [ref=e33]
          - paragraph [ref=e34]: luis.fernandez@correo.com
          - text: Lector desde 06 ago 2026
        - article [ref=e35]:
          - generic [ref=e36]: MJ
          - heading "María Jiménez" [level=3] [ref=e37]
          - paragraph [ref=e38]: maria.jimenez@correo.com
          - text: Lector desde 06 ago 2026
  - generic [ref=e40]:
    - button "Cerrar" [ref=e41] [cursor=pointer]: ×
    - generic [ref=e42]:
      - heading "Registrar lector" [level=2] [ref=e43]
      - paragraph [ref=e44]: Nueva ficha de socio
      - generic [ref=e45]:
        - generic [ref=e46]:
          - generic [ref=e47]: Nombre completo
          - textbox "Nombre completo" [ref=e48]: Juan Pérez
        - generic [ref=e49]:
          - generic [ref=e50]: Correo
          - textbox "Correo" [ref=e51]: juan@email.com
        - generic [ref=e52]:
          - generic [ref=e53]: Teléfono
          - textbox "Teléfono" [ref=e54]: 6000-0000
        - generic [ref=e55]:
          - button "Cancelar" [ref=e56] [cursor=pointer]
          - button "Registrar" [active] [ref=e57] [cursor=pointer]
  - generic: Ya existe un usuario con ese correo
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | 
  3  | class UsuariosPage {
  4  | 
  5  |     constructor(page) {
  6  | 
  7  |         this.page = page;
  8  | 
  9  |         this.btnNuevoUsuario = page.locator('#btn-nuevo-usuario');
  10 | 
  11 |         this.txtNombre = page.locator('#u-nombre');
  12 | 
  13 |         this.txtCorreo = page.locator('#u-correo');
  14 | 
  15 |         this.txtTelefono = page.locator('#u-telefono');
  16 | 
  17 |         this.btnGuardar = page.locator('button[type="submit"]');
  18 | 
  19 |         this.tarjetasUsuarios = page.locator('.reader-card');
  20 | 
  21 |     }
  22 | 
  23 |     async abrirFormulario() {
  24 | 
  25 |         await this.btnNuevoUsuario.click();
  26 | 
  27 |     }
  28 | 
  29 |     async crearUsuario(nombre, correo, telefono) {
  30 | 
  31 |         await this.abrirFormulario();
  32 | 
  33 |         await this.txtNombre.fill(nombre);
  34 | 
  35 |         await this.txtCorreo.fill(correo);
  36 | 
  37 |         await this.txtTelefono.fill(telefono);
  38 | 
  39 |         await this.btnGuardar.click();
  40 | 
  41 |     }
  42 | 
  43 |     async verificarUsuario(nombre) {
  44 | 
> 45 |         await expect(this.tarjetasUsuarios).toContainText(nombre);
     |                                             ^ Error: expect(locator).toContainText(expected) failed
  46 | 
  47 |     }
  48 | 
  49 | }
  50 | 
  51 | module.exports = UsuariosPage;
```