// ============================================================
// Bibliotheca — lógica de frontend (vanilla JS, sin frameworks)
// Consume la API REST expuesta por el backend Express.
// ============================================================
const API = '/api';

const estado = {
  libros: [],
  categorias: [],
  usuarios: [],
  prestamos: [],
  filtroEstadoPrestamo: '',
};

// ---------- utilidades ----------
async function api(path, opciones = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || 'Ocurrió un error inesperado');
  return data;
}

function mostrarToast(mensaje, tipo = 'ok') {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.className = 'toast show' + (tipo === 'error' ? ' error' : '');
  clearTimeout(mostrarToast._t);
  mostrarToast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

function iniciales(nombre) {
  return nombre.split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return '—';
  const f = new Date(fechaStr.replace(' ', 'T'));
  if (isNaN(f)) return fechaStr;
  return f.toLocaleDateString('es-PA', { day: '2-digit', month: 'short', year: 'numeric' });
}

function signatura(libro) {
  // Genera una "signatura topográfica" simple a partir de la categoría y el id
  const prefijo = (libro.categoria_nombre || 'GEN').slice(0, 3).toUpperCase();
  return `${prefijo}-${String(libro.id_libro).padStart(3, '0')}`;
}

// ---------- navegación entre vistas ----------
document.getElementById('tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const vista = btn.dataset.view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${vista}`).classList.add('active');

  if (vista === 'panel') cargarEstadisticas();
});

// ---------- modal genérico ----------
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

function abrirModal(html) {
  modalContent.innerHTML = html;
  overlay.classList.add('open');
}
function cerrarModal() {
  overlay.classList.remove('open');
  modalContent.innerHTML = '';
}
document.getElementById('modal-close').addEventListener('click', cerrarModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });

// ============================================================
// CATÁLOGO DE LIBROS
// ============================================================
async function cargarCategorias() {
  estado.categorias = await api('/categorias');
  const select = document.getElementById('select-categoria');
  select.innerHTML = '<option value="">Todas las categorías</option>' +
    estado.categorias.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');
}

async function cargarLibros() {
  const q = document.getElementById('input-buscar').value.trim();
  const categoria = document.getElementById('select-categoria').value;
  const disponibles = document.getElementById('check-disponibles').checked;

  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (categoria) params.set('categoria', categoria);
  if (disponibles) params.set('disponibles', 'true');

  estado.libros = await api(`/libros?${params.toString()}`);
  renderizarLibros();
}

function renderizarLibros() {
  const shelf = document.getElementById('shelf-libros');
  const vacio = document.getElementById('catalogo-vacio');

  if (estado.libros.length === 0) {
    shelf.innerHTML = '';
    vacio.hidden = false;
    return;
  }
  vacio.hidden = true;

  shelf.innerHTML = estado.libros.map(libro => {
    const sinStock = libro.ejemplares_disponibles === 0;
    return `
      <article class="libro-card ${sinStock ? 'sin-stock' : ''}">
        <span class="libro-signatura">${signatura(libro)}</span>
        <h3 class="libro-titulo">${escapeHtml(libro.titulo)}</h3>
        <p class="libro-autor">${escapeHtml(libro.autor)}${libro.anio_publicacion ? ' · ' + libro.anio_publicacion : ''}</p>
        <div class="libro-meta">
          <span class="libro-categoria">${libro.categoria_nombre || 'Sin categoría'}</span>
          <span class="libro-stock ${sinStock ? 'bajo' : 'ok'}">${libro.ejemplares_disponibles}/${libro.ejemplares_totales} disp.</span>
        </div>
        <div class="libro-acciones">
          <button class="btn btn-secondary" data-accion="editar-libro" data-id="${libro.id_libro}">Editar</button>
          <button class="btn btn-danger" data-accion="borrar-libro" data-id="${libro.id_libro}">Quitar</button>
        </div>
      </article>
    `;
  }).join('');
}

function escapeHtml(str = '') {
  return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

document.getElementById('input-buscar').addEventListener('input', debounce(cargarLibros, 300));
document.getElementById('select-categoria').addEventListener('change', cargarLibros);
document.getElementById('check-disponibles').addEventListener('change', cargarLibros);

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

document.getElementById('shelf-libros').addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-accion]');
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.dataset.accion === 'editar-libro') {
    const libro = estado.libros.find(l => String(l.id_libro) === id);
    abrirFormularioLibro(libro);
  }
  if (btn.dataset.accion === 'borrar-libro') {
    if (!confirm('¿Quitar este libro del catálogo? Esta acción no se puede deshacer.')) return;
    try {
      await api(`/libros/${id}`, { method: 'DELETE' });
      mostrarToast('Libro eliminado del catálogo.');
      cargarLibros();
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
  }
});

document.getElementById('btn-nuevo-libro').addEventListener('click', () => abrirFormularioLibro());

function abrirFormularioLibro(libro = null) {
  const esEdicion = !!libro;
  const opcionesCategoria = estado.categorias.map(c =>
    `<option value="${c.id_categoria}" ${libro?.id_categoria === c.id_categoria ? 'selected' : ''}>${c.nombre}</option>`
  ).join('');

  abrirModal(`
    <h2>${esEdicion ? 'Editar libro' : 'Añadir libro'}</h2>
    <p class="modal-sub">${esEdicion ? signatura(libro) : 'Nueva ficha del catálogo'}</p>
    <form id="form-libro">
      <div class="form-field">
        <label for="f-titulo">Título</label>
        <input id="f-titulo" required value="${libro ? escapeHtml(libro.titulo) : ''}">
      </div>
      <div class="form-field">
        <label for="f-autor">Autor</label>
        <input id="f-autor" required value="${libro ? escapeHtml(libro.autor) : ''}">
      </div>
      <div class="form-row">
        <div class="form-field">
          <label for="f-isbn">ISBN</label>
          <input id="f-isbn" value="${libro?.isbn || ''}">
        </div>
        <div class="form-field">
          <label for="f-anio">Año</label>
          <input id="f-anio" type="number" value="${libro?.anio_publicacion || ''}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label for="f-categoria">Categoría</label>
          <select id="f-categoria"><option value="">Sin categoría</option>${opcionesCategoria}</select>
        </div>
        <div class="form-field">
          <label for="f-ejemplares">Ejemplares</label>
          <input id="f-ejemplares" type="number" min="1" value="${libro?.ejemplares_totales || 1}" ${esEdicion ? 'disabled title="Se ajusta automáticamente con los préstamos"' : ''}>
        </div>
      </div>
      <div class="form-field">
        <label for="f-sinopsis">Sinopsis</label>
        <textarea id="f-sinopsis">${libro?.sinopsis || ''}</textarea>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" id="cancelar-libro">Cancelar</button>
        <button type="submit" class="btn btn-primary btn-block">${esEdicion ? 'Guardar cambios' : 'Añadir al catálogo'}</button>
      </div>
    </form>
  `);

  document.getElementById('cancelar-libro').addEventListener('click', cerrarModal);
  document.getElementById('form-libro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      titulo: document.getElementById('f-titulo').value.trim(),
      autor: document.getElementById('f-autor').value.trim(),
      isbn: document.getElementById('f-isbn').value.trim() || null,
      anio_publicacion: Number(document.getElementById('f-anio').value) || null,
      id_categoria: Number(document.getElementById('f-categoria').value) || null,
      ejemplares_totales: Number(document.getElementById('f-ejemplares').value) || 1,
      sinopsis: document.getElementById('f-sinopsis').value.trim() || null,
    };
    try {
      if (esEdicion) {
        await api(`/libros/${libro.id_libro}`, { method: 'PUT', body: JSON.stringify(payload) });
        mostrarToast('Cambios guardados.');
      } else {
        await api('/libros', { method: 'POST', body: JSON.stringify(payload) });
        mostrarToast('Libro añadido al catálogo.');
      }
      cerrarModal();
      cargarLibros();
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
  });
}

// ============================================================
// PRÉSTAMOS
// ============================================================
async function cargarPrestamos() {
  const params = estado.filtroEstadoPrestamo ? `?estado=${estado.filtroEstadoPrestamo}` : '';
  estado.prestamos = await api(`/prestamos${params}`);
  renderizarPrestamos();
}

function renderizarPrestamos() {
  const tbody = document.querySelector('#tabla-prestamos tbody');
  const vacio = document.getElementById('prestamos-vacio');

  if (estado.prestamos.length === 0) {
    tbody.innerHTML = '';
    vacio.hidden = false;
    return;
  }
  vacio.hidden = true;

  const hoy = new Date().toISOString().slice(0, 10);

  tbody.innerHTML = estado.prestamos.map(p => {
    const atrasado = p.estado === 'activo' && p.fecha_limite < hoy;
    const estadoVisual = atrasado ? 'atrasado' : p.estado;
    const etiqueta = { activo: 'Activo', devuelto: 'Devuelto', atrasado: 'Atrasado' }[estadoVisual];

    return `
      <tr>
        <td><strong>${escapeHtml(p.titulo)}</strong></td>
        <td>${escapeHtml(p.nombre_completo)}</td>
        <td class="fecha">${formatearFecha(p.fecha_prestamo)}</td>
        <td class="fecha">${formatearFecha(p.fecha_limite)}</td>
        <td><span class="estado-tag ${estadoVisual}">${etiqueta}</span></td>
        <td>${p.estado === 'activo' ? `<button class="btn btn-secondary" data-accion="devolver" data-id="${p.id_prestamo}">Registrar devolución</button>` : ''}</td>
      </tr>
    `;
  }).join('');
}

document.getElementById('filtro-estado').addEventListener('click', (e) => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  document.querySelectorAll('#filtro-estado .pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  estado.filtroEstadoPrestamo = pill.dataset.estado;
  cargarPrestamos();
});

document.querySelector('#tabla-prestamos tbody').addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-accion="devolver"]');
  if (!btn) return;
  try {
    await api(`/prestamos/${btn.dataset.id}/devolver`, { method: 'PUT' });
    mostrarToast('Devolución registrada. El ejemplar vuelve al catálogo.');
    cargarPrestamos();
  } catch (err) {
    mostrarToast(err.message, 'error');
  }
});

document.getElementById('btn-nuevo-prestamo').addEventListener('click', async () => {
  if (estado.libros.length === 0) await cargarLibros();
  if (estado.usuarios.length === 0) estado.usuarios = await api('/usuarios');

  const librosDisponibles = estado.libros.filter(l => l.ejemplares_disponibles > 0);

  abrirModal(`
    <h2>Registrar préstamo</h2>
    <p class="modal-sub">Vence a los 14 días</p>
    <form id="form-prestamo">
      <div class="form-field">
        <label for="p-libro">Libro</label>
        <select id="p-libro" required>
          <option value="">Selecciona un libro…</option>
          ${librosDisponibles.map(l => `<option value="${l.id_libro}">${escapeHtml(l.titulo)} — ${l.ejemplares_disponibles} disp.</option>`).join('')}
        </select>
      </div>
      <div class="form-field">
        <label for="p-usuario">Lector</label>
        <select id="p-usuario" required>
          <option value="">Selecciona un lector…</option>
          ${estado.usuarios.map(u => `<option value="${u.id_usuario}">${escapeHtml(u.nombre_completo)}</option>`).join('')}
        </select>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" id="cancelar-prestamo">Cancelar</button>
        <button type="submit" class="btn btn-primary btn-block" ${librosDisponibles.length === 0 ? 'disabled' : ''}>Confirmar préstamo</button>
      </div>
      ${librosDisponibles.length === 0 ? '<p style="font-size:13px;color:var(--sello);margin-top:10px;">No hay ejemplares disponibles en este momento.</p>' : ''}
    </form>
  `);

  document.getElementById('cancelar-prestamo').addEventListener('click', cerrarModal);
  document.getElementById('form-prestamo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      id_libro: Number(document.getElementById('p-libro').value),
      id_usuario: Number(document.getElementById('p-usuario').value),
    };
    try {
      await api('/prestamos', { method: 'POST', body: JSON.stringify(payload) });
      mostrarToast('Préstamo registrado.');
      cerrarModal();
      cargarPrestamos();
      cargarLibros();
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
  });
});

// ============================================================
// USUARIOS / LECTORES
// ============================================================
async function cargarUsuarios() {
  estado.usuarios = await api('/usuarios');
  renderizarUsuarios();
}

function renderizarUsuarios() {
  const grid = document.getElementById('grid-usuarios');
  const vacio = document.getElementById('usuarios-vacio');

  if (estado.usuarios.length === 0) {
    grid.innerHTML = '';
    vacio.hidden = false;
    return;
  }
  vacio.hidden = true;

  grid.innerHTML = estado.usuarios.map(u => `
    <article class="reader-card">
      <div class="reader-avatar">${iniciales(u.nombre_completo)}</div>
      <h3 class="reader-name">${escapeHtml(u.nombre_completo)}</h3>
      <p class="reader-mail">${escapeHtml(u.correo)}</p>
      <span class="reader-stat">Lector desde ${formatearFecha(u.fecha_registro)}</span>
    </article>
  `).join('');
}

document.getElementById('btn-nuevo-usuario').addEventListener('click', () => {
  abrirModal(`
    <h2>Registrar lector</h2>
    <p class="modal-sub">Nueva ficha de socio</p>
    <form id="form-usuario">
      <div class="form-field">
        <label for="u-nombre">Nombre completo</label>
        <input id="u-nombre" required>
      </div>
      <div class="form-field">
        <label for="u-correo">Correo</label>
        <input id="u-correo" type="email" required>
      </div>
      <div class="form-field">
        <label for="u-telefono">Teléfono</label>
        <input id="u-telefono">
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" id="cancelar-usuario">Cancelar</button>
        <button type="submit" class="btn btn-primary btn-block">Registrar</button>
      </div>
    </form>
  `);

  document.getElementById('cancelar-usuario').addEventListener('click', cerrarModal);
  document.getElementById('form-usuario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      nombre_completo: document.getElementById('u-nombre').value.trim(),
      correo: document.getElementById('u-correo').value.trim(),
      telefono: document.getElementById('u-telefono').value.trim() || null,
    };
    try {
      await api('/usuarios', { method: 'POST', body: JSON.stringify(payload) });
      mostrarToast('Lector registrado.');
      cerrarModal();
      cargarUsuarios();
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
  });
});

// ============================================================
// PANEL / ESTADÍSTICAS
// ============================================================
async function cargarEstadisticas() {
  const r = await api('/prestamos/estadisticas/resumen');
  const grid = document.getElementById('stat-grid');
  grid.innerHTML = `
    <div class="stat-card">
      <div class="stat-num">${r.totalLibros}</div>
      <div class="stat-label">Ejemplares en total</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${r.disponibles}</div>
      <div class="stat-label">Disponibles ahora</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${r.prestamosActivos}</div>
      <div class="stat-label">Préstamos activos</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${r.totalUsuarios}</div>
      <div class="stat-label">Lectores registrados</div>
    </div>
    <div class="stat-card acento">
      <div class="stat-num">${r.atrasados}</div>
      <div class="stat-label">Préstamos atrasados</div>
    </div>
  `;
}

// ============================================================
// INICIO
// ============================================================
(async function iniciar() {
  try {
    await cargarCategorias();
    await cargarLibros();
    await cargarUsuarios();
    await cargarPrestamos();
  } catch (err) {
    mostrarToast('No se pudo conectar con el servidor. ¿Está corriendo el backend?', 'error');
    console.error(err);
  }
})();
