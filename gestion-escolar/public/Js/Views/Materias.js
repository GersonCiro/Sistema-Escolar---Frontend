document.addEventListener('DOMContentLoaded', cargarMaterias);

async function cargarMaterias() {
    const materias = await ApiService.get('/materias'); // Verifica ruta backend
    const tabla = document.getElementById('tablaMaterias');
    tabla.innerHTML = '';

    materias.forEach(m => {
        tabla.innerHTML += `
            <tr class="border-b">
                <td class="p-3">${m.nombre}</td>
                <td class="p-3"><span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${m.creditos || 0} cred</span></td>
                <td class="p-3 text-right">
                    <button onclick="eliminarMateria(${m.id})" class="text-red-500 hover:underline">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

document.getElementById('formMateria').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombreMateria').value,
        creditos: document.getElementById('creditosMateria').value
    };
    if(await ApiService.post('/materias', data)) {
        document.getElementById('formMateria').reset();
        cargarMaterias();
    }
});

window.eliminarMateria = async (id) => {
    if(confirm('¿Borrar materia?')) {
        await ApiService.delete(`/materias/${id}`);
        cargarMaterias();
    }
};