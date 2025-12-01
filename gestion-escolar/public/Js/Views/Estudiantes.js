document.addEventListener('DOMContentLoaded', cargarEstudiantes);

async function cargarEstudiantes() {
    const estudiantes = await ApiService.get('/estudiantes');
    const tabla = document.getElementById('tablaEstudiantes');
    tabla.innerHTML = '';

    estudiantes.forEach(est => {
        const row = document.createElement('tr');
        row.className = "border-b hover:bg-slate-50";
        row.innerHTML = `
            <td class="p-3 font-bold text-blue-600">#${est.id}</td>
            <td class="p-3">${est.nombre} ${est.apellido}</td>
            <td class="p-3 text-right">
                <button onclick="eliminarEstudiante(${est.id})" class="text-red-500 font-bold hover:underline">Eliminar</button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

document.getElementById('formEstudiante').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value
    };
    if (await ApiService.post('/estudiantes', data)) {
        document.getElementById('formEstudiante').reset();
        cargarEstudiantes();
    }
});

window.eliminarEstudiante = async (id) => {
    if(confirm("¿Eliminar estudiante?")) {
        await ApiService.delete(`/estudiantes/${id}`);
        cargarEstudiantes();
    }
};