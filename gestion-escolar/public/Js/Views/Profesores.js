document.addEventListener('DOMContentLoaded', cargarProfesores);

// Carga la lista de profesores en la tabla
async function cargarProfesores() {
    const data = await ApiService.get('/profesores');
    const tabla = document.getElementById('tablaProfesores');
    tabla.innerHTML = '';

    data.forEach(p => {
        const row = document.createElement('tr');
        row.className = "border-b hover:bg-slate-50";
        row.innerHTML = `
            <td class="p-3 font-bold text-indigo-600">#${p.id}</td>
            <td class="p-3">${p.nombre} ${p.apellido}</td>
            <td class="p-3 text-right">
                <button onclick="eliminarProfesor(${p.id})" class="text-red-500 font-bold hover:underline">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

// Manejo del envío del formulario de nuevo profesor
document.getElementById('formProfesor').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value
    };
    if(await ApiService.post('/profesores', data)) {
        document.getElementById('formProfesor').reset();
        cargarProfesores();
    }
});

// Función global para eliminar un profesor
window.eliminarProfesor = async (id) => {
    if(confirm("¿Eliminar profesor?")) {
        await ApiService.delete(`/profesores/${id}`);
        cargarProfesores();
    }
};