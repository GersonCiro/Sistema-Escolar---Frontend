let currentType = 'estudiante'; // Estado inicial

document.addEventListener('DOMContentLoaded', () => {
    // Al cargar, inicializamos todo como 'estudiante'
    cargarOpcionesUsuarios('estudiante');
    cargarMaterias();
    cargarAsignaciones('estudiante');
});

// Función global que se activa al dar clic en los Radio Buttons del HTML
window.cambiarTipo = (tipo) => {
    currentType = tipo;
    
    // 1. Cambiar etiquetas visuales
    const label = tipo === 'estudiante' ? "Seleccione Estudiante" : "Seleccione Profesor";
    document.getElementById('lblUsuario').innerText = label;
    
    const badge = tipo === 'estudiante' ? "Viendo: Estudiantes" : "Viendo: Profesores";
    document.getElementById('badgeTipo').innerText = badge;

    // 2. Recargar datos
    cargarOpcionesUsuarios(tipo);
    cargarAsignaciones(tipo);
};

async function cargarOpcionesUsuarios(tipo) {
    // Busca en /estudiantes o /profesores según corresponda
    const endpoint = tipo === 'estudiante' ? '/estudiantes' : '/profesores';
    const usuarios = await ApiService.get(endpoint);
    
    const sel = document.getElementById('selUsuario');
    sel.innerHTML = '<option value="">-- Seleccione --</option>';
    
    if(usuarios && usuarios.length > 0) {
        usuarios.forEach(u => {
            // Muestra Nombre y Apellido
            sel.innerHTML += `<option value="${u.id}">${u.nombre} ${u.apellido}</option>`;
        });
    }
}

async function cargarMaterias() {
    const materias = await ApiService.get('/materias');
    const sel = document.getElementById('selMateria');
    sel.innerHTML = '<option value="">-- Seleccione --</option>';
    
    if(materias && materias.length > 0) {
        materias.forEach(m => {
            sel.innerHTML += `<option value="${m.id}">${m.nombre}</option>`;
        });
    }
}

async function cargarAsignaciones(tipo) {
    const tabla = document.getElementById('tablaAsignaciones');
    tabla.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Cargando datos...</td></tr>';

    // ATENCIÓN: Estas rutas deben existir en tu Backend
    const endpoint = tipo === 'estudiante' ? '/asignaciones/estudiantes' : '/asignaciones/profesores';
    const datos = await ApiService.get(endpoint);

    tabla.innerHTML = '';
    if(!datos || datos.length === 0) {
        tabla.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">No hay asignaciones registradas para este grupo.</td></tr>';
        return;
    }

    datos.forEach(item => {
        const row = document.createElement('tr');
        row.className = "border-b hover:bg-gray-50";
        // IMPORTANTE: Los campos usuario_nombre y usuario_apellido vienen del JOIN en el Backend
        row.innerHTML = `
            <td class="p-3 text-gray-400 text-sm">#${item.id}</td>
            <td class="p-3 font-bold text-gray-700">${item.usuario_nombre} ${item.usuario_apellido}</td>
            <td class="p-3 text-purple-600 font-medium">${item.materia_nombre}</td>
            <td class="p-3 text-right">
                <button onclick="eliminarAsignacion(${item.id})" class="text-red-400 hover:text-red-600 text-sm font-bold border border-red-200 px-2 py-1 rounded hover:bg-red-50">Desasignar</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

document.getElementById('formAsignacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const usuarioId = document.getElementById('selUsuario').value;
    const materiaId = document.getElementById('selMateria').value;

    if(!usuarioId || !materiaId) return alert("Por favor seleccione ambos campos.");

    // Preparamos datos para enviar
    let data = { materia_id: materiaId };
    let endpoint = '';

    if (currentType === 'estudiante') {
        data.estudiante_id = usuarioId;
        endpoint = '/asignaciones/estudiantes';
    } else {
        data.profesor_id = usuarioId;
        endpoint = '/asignaciones/profesores';
    }

    const exito = await ApiService.post(endpoint, data);
    
    if(exito) {
        alert("✅ Asignación realizada con éxito");
        cargarAsignaciones(currentType); // Recargar tabla
    }
});

window.eliminarAsignacion = async (id) => {
    if(confirm('¿Seguro que desea eliminar esta asignación?')) {
        const endpoint = currentType === 'estudiante' 
            ? `/asignaciones/estudiantes/${id}` 
            : `/asignaciones/profesores/${id}`;
            
        await ApiService.delete(endpoint);
        cargarAsignaciones(currentType);
    }
};