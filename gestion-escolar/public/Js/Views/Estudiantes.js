// Cargar lista al iniciar
document.addEventListener('DOMContentLoaded', cargarEstudiantes);

async function cargarEstudiantes() {
    // IMPORTANTE: Verifica que '/estudiantes' sea la ruta correcta en tu backend
    const estudiantes = await ApiService.get('/estudiantes');
    const tabla = document.getElementById('tablaEstudiantes');
    tabla.innerHTML = '';

    estudiantes.forEach(est => {
        const row = document.createElement('tr');
        row.className = "border-b hover:bg-slate-50";
        row.innerHTML = `
            <td class="p-3 font-bold text-blue-600">#${est.id}</td>
            <td class="p-3">${est.nombre}</td>
            <td class="p-3 text-right">
                <button onclick="eliminarEstudiante(${est.id})" class="text-red-500 hover:text-red-700 text-sm font-semibold">ELIMINAR</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

// Guardar
document.getElementById('formEstudiante').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    
    const respuesta = await ApiService.post('/estudiantes', { nombre }); // Ajusta el objeto según tu Backend
    
    if (respuesta) {
        document.getElementById('formEstudiante').reset();
        cargarEstudiantes();
    }
});

// Eliminar (Debe ser global para que el HTML lo vea)
window.eliminarEstudiante = async (id) => {
    if(confirm("¿Estás seguro de eliminar este estudiante?")) {
        await ApiService.delete(`/estudiantes/${id}`);
        cargarEstudiantes();
    }
};