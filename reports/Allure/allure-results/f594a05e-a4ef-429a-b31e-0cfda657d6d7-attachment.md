# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: libros.spec.js >> Módulo Libros >> Escenario 3 - Buscar libro inexistente
- Location: tests\e2e\libros.spec.js:43:5

# Error details

```
TypeError: libros.buscarLibro is not a function
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e7]:
      - generic [ref=e8]: Bibliotheca
      - generic [ref=e9]: catálogo & préstamos
    - navigation [ref=e10]:
      - button "Catálogo" [active] [ref=e11] [cursor=pointer]
      - button "Préstamos" [ref=e12] [cursor=pointer]
      - button "Lectores" [ref=e13] [cursor=pointer]
      - button "Panel" [ref=e14] [cursor=pointer]
  - main [ref=e15]:
    - generic [ref=e16]:
      - generic [ref=e17]:
        - generic [ref=e18]:
          - paragraph [ref=e19]: Fondo bibliográfico
          - heading "El catálogo" [level=1] [ref=e20]
        - button "+ Añadir libro" [ref=e21] [cursor=pointer]
      - generic [ref=e22]:
        - textbox "Buscar por título, autor o ISBN…" [ref=e27]
        - combobox [ref=e28] [cursor=pointer]:
          - option "Todas las categorías" [selected]
          - option "Ciencia"
          - option "Ciencia Ficción"
          - option "Historia"
          - option "Infantil"
          - option "Novela"
          - option "Poesía"
          - option "Tecnología"
        - generic [ref=e29] [cursor=pointer]:
          - checkbox "Solo disponibles" [ref=e30]
          - generic [ref=e31]: Solo disponibles
      - generic [ref=e32]:
        - article [ref=e33]:
          - generic [ref=e34]: CIE-005
          - heading "Cosmos" [level=3] [ref=e35]
          - paragraph [ref=e36]: Carl Sagan · 1980
          - generic [ref=e37]:
            - generic [ref=e38]: Ciencia
            - generic [ref=e39]: 2/2 disp.
          - generic [ref=e40]:
            - button "Editar" [ref=e41] [cursor=pointer]
            - button "Quitar" [ref=e42] [cursor=pointer]
        - article [ref=e43]:
          - generic [ref=e44]: INF-002
          - heading "El principito" [level=3] [ref=e45]
          - paragraph [ref=e46]: Antoine de Saint-Exupéry · 1943
          - generic [ref=e47]:
            - generic [ref=e48]: Infantil
            - generic [ref=e49]: 6/6 disp.
          - generic [ref=e50]:
            - button "Editar" [ref=e51] [cursor=pointer]
            - button "Quitar" [ref=e52] [cursor=pointer]
        - article [ref=e53]:
          - generic [ref=e54]: CIE-003
          - heading "Fahrenheit 451" [level=3] [ref=e55]
          - paragraph [ref=e56]: Ray Bradbury · 1953
          - generic [ref=e57]:
            - generic [ref=e58]: Ciencia Ficción
            - generic [ref=e59]: 3/3 disp.
          - generic [ref=e60]:
            - button "Editar" [ref=e61] [cursor=pointer]
            - button "Quitar" [ref=e62] [cursor=pointer]
        - article [ref=e63]:
          - generic [ref=e64]: GEN-032
          - heading "Playwright Testing 2" [level=3] [ref=e65]
          - paragraph [ref=e66]: Orlando Amores
          - generic [ref=e67]:
            - generic [ref=e68]: Sin categoría
            - generic [ref=e69]: 1/1 disp.
          - generic [ref=e70]:
            - button "Editar" [ref=e71] [cursor=pointer]
            - button "Quitar" [ref=e72] [cursor=pointer]
        - article [ref=e73]:
          - generic [ref=e74]: GEN-033
          - heading "Playwright Testing 2" [level=3] [ref=e75]
          - paragraph [ref=e76]: Orlando Amores
          - generic [ref=e77]:
            - generic [ref=e78]: Sin categoría
            - generic [ref=e79]: 1/1 disp.
          - generic [ref=e80]:
            - button "Editar" [ref=e81] [cursor=pointer]
            - button "Quitar" [ref=e82] [cursor=pointer]
        - article [ref=e83]:
          - generic [ref=e84]: TEC-007
          - heading "Playwright Testing Actualizado" [level=3] [ref=e85]
          - paragraph [ref=e86]: Robert C. Martin · 2008
          - generic [ref=e87]:
            - generic [ref=e88]: Tecnología
            - generic [ref=e89]: 4/4 disp.
          - generic [ref=e90]:
            - button "Editar" [ref=e91] [cursor=pointer]
            - button "Quitar" [ref=e92] [cursor=pointer]
        - article [ref=e93]:
          - generic [ref=e94]: GEN-011
          - heading "Pruebas QA" [level=3] [ref=e95]
          - paragraph [ref=e96]: Orlando · 2026
          - generic [ref=e97]:
            - generic [ref=e98]: Sin categoría
            - generic [ref=e99]: 1/1 disp.
          - generic [ref=e100]:
            - button "Editar" [ref=e101] [cursor=pointer]
            - button "Quitar" [ref=e102] [cursor=pointer]
        - article [ref=e103]:
          - generic [ref=e104]: NOV-009
          - heading "Rayuela" [level=3] [ref=e105]
          - paragraph [ref=e106]: Julio Cortázar · 1963
          - generic [ref=e107]:
            - generic [ref=e108]: Novela
            - generic [ref=e109]: 2/2 disp.
          - generic [ref=e110]:
            - button "Editar" [ref=e111] [cursor=pointer]
            - button "Quitar" [ref=e112] [cursor=pointer]
        - article [ref=e113]:
          - generic [ref=e114]: HIS-004
          - 'heading "Sapiens: De animales a dioses" [level=3] [ref=e115]'
          - paragraph [ref=e116]: Yuval Noah Harari · 2011
          - generic [ref=e117]:
            - generic [ref=e118]: Historia
            - generic [ref=e119]: 5/5 disp.
          - generic [ref=e120]:
            - button "Editar" [ref=e121] [cursor=pointer]
            - button "Quitar" [ref=e122] [cursor=pointer]
        - article [ref=e123]:
          - generic [ref=e124]: POE-006
          - heading "Veinte poemas de amor" [level=3] [ref=e125]
          - paragraph [ref=e126]: Pablo Neruda · 1924
          - generic [ref=e127]:
            - generic [ref=e128]: Poesía
            - generic [ref=e129]: 3/3 disp.
          - generic [ref=e130]:
            - button "Editar" [ref=e131] [cursor=pointer]
            - button "Quitar" [ref=e132] [cursor=pointer]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | const HomePage = require('./pages/HomePage');
  4   | const LibrosPage = require('./pages/LibrosPage');
  5   | 
  6   | test.describe('Módulo Libros', () => {
  7   | 
  8   |     test.beforeEach(async ({ page }) => {
  9   | 
  10  |         const home = new HomePage(page);
  11  | 
  12  |         await home.abrir();
  13  | 
  14  |         await home.irCatalogo();
  15  | 
  16  |     });
  17  | 
  18  |     test('Escenario 1 - Registrar un libro', async ({ page }) => {
  19  | 
  20  |         const libros = new LibrosPage(page);
  21  | 
  22  |         await libros.crearLibro(
  23  |             'Playwright Testing 2',
  24  |             'Orlando Amores',
  25  |             '123456',
  26  |             '2026'
  27  |         );
  28  | 
  29  |         await libros.verificarLibro('Playwright Testing 2');
  30  | 
  31  |     });
  32  | 
  33  |     test('Escenario 2 - Buscar libro existente', async ({ page }) => {
  34  | 
  35  |         const libros = new LibrosPage(page);
  36  | 
  37  |         await libros.buscarLibro('Playwright');
  38  | 
  39  |         await libros.verificarLibro('Playwright Testing 2');
  40  | 
  41  |     });
  42  | 
  43  |     test('Escenario 3 - Buscar libro inexistente', async ({ page }) => {
  44  | 
  45  |         const libros = new LibrosPage(page);
  46  | 
> 47  |         await libros.buscarLibro('xxxxxxxxxxxxxxxx');
      |                      ^ TypeError: libros.buscarLibro is not a function
  48  | 
  49  |         await libros.verificarMensajeSinResultados();
  50  | 
  51  |     });
  52  | 
  53  |     test('Escenario 4 - Editar un libro', async ({ page }) => {
  54  | 
  55  |         const libros = new LibrosPage(page);
  56  | 
  57  |         await libros.editarPrimerLibro(
  58  |             'Playwright Testing Actualizado'
  59  |         );
  60  | 
  61  |         await libros.verificarLibro(
  62  |             'Playwright Testing Actualizado'
  63  |         );
  64  | 
  65  |     });
  66  | 
  67  |     test('Escenario 5 - Eliminar un libro', async ({ page }) => {
  68  | 
  69  |         const libros = new LibrosPage(page);
  70  | 
  71  |         await libros.eliminarPrimerLibro();
  72  | 
  73  |         await libros.verificarLibroNoExiste(
  74  |             'Playwright Testing Actualizado'
  75  |         );
  76  | 
  77  |     });
  78  |        test('Escenario 6 - Buscar libro existente', async ({ page }) => {
  79  | 
  80  |         const libros = new LibrosPage(page);
  81  | 
  82  |         await libros.buscarLibro('1984');
  83  | 
  84  |         await libros.verificarLibro('1984');
  85  | 
  86  |     });
  87  |            test('Escenario 7 - Encontrar libro existente', async ({ page }) => {
  88  | 
  89  |         const libros = new LibrosPage(page);
  90  | 
  91  |         await libros.buscarLibro('Clean Code');
  92  | 
  93  |         await libros.verificarLibro('Clean Code');
  94  | 
  95  |     });
  96  |         test('Escenario 8 - Registrar un libro', async ({ page }) => {
  97  | 
  98  |         const libros = new LibrosPage(page);
  99  | 
  100 |         await libros.crearLibro(
  101 |             'ejemplo 1',
  102 |             'Orlando Amores',
  103 |             '789456',
  104 |             '2026'
  105 |         );
  106 | 
  107 |         await libros.verificarLibro('ejemplo 1');
  108 | 
  109 |     });
  110 |         test('Escenario 9 - Registrar un libro', async ({ page }) => {
  111 | 
  112 |         const libros = new LibrosPage(page);
  113 | 
  114 |         await libros.crearLibro(
  115 |             'Andre Gabriel',
  116 |             'Orlando Amores',
  117 |             '895645',
  118 |             '2026'
  119 |         );
  120 | 
  121 |         await libros.verificarLibro('Andre Gabriel');
  122 | 
  123 |     });
  124 | 
  125 | });
```