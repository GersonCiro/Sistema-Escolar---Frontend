document.addEventListener('DOMContentLoaded', cargarMaterias);

async function cargarMaterias() {
    const materias = await ApiService.get('/materias');
    const tabla = document.getElementById('tablaMaterias');
    tabla.innerHTML = '';

    materias.forEach(m => {
        tabla.innerHTML += `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3 font-bold text-gray-500">#${m.id}</td>
                <td class="p-3 font-medium">${m.nombre}</td>
                <td class="p-3 text-right space-x-2">
                    <button onclick='iniciarEdicion(${JSON.stringify(m)})' class="text-blue-500 hover:text-blue-700 font-semibold">Editar</button>
                    <button onclick="eliminarMateria(${m.id})" class="text-red-500 hover:text-red-700 font-semibold">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

window.iniciarEdicion = (materia) => {
    document.getElementById('materiaId').value = materia.id;
    document.getElementById('nombreMateria').value = materia.nombre;
    
    document.getElementById('formTitle').innerText = "Editar Materia #" + materia.id;
    document.getElementById('btnSubmit').innerText = "Actualizar";
    document.getElementById('btnSubmit').classList.replace('bg-green-600', 'bg-blue-600');
    document.getElementById('btnCancel').classList.remove('hidden');
};

window.resetForm = () => {
    document.getElementById('formMateria').reset();
    document.getElementById('materiaId').value = '';
    
    document.getElementById('formTitle').innerText = "Registrar Materia";
    document.getElementById('btnSubmit').innerText = "Crear";
    document.getElementById('btnSubmit').classList.replace('bg-blue-600', 'bg-green-600');
    document.getElementById('btnCancel').classList.add('hidden');
};

document.getElementById('formMateria').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('materiaId').value;
    const data = { nombre: document.getElementById('nombreMateria').value }; // Solo enviamos nombre

    let exito = false;
    if (id) {
        exito = await ApiService.put(`/materias/${id}`, data);
    } else {
        exito = await ApiService.post('/materias', data);
    }

    if(exito) {
        resetForm();
        cargarMaterias();
    }
});

window.eliminarMateria = async (id) => {
    if(confirm('¿Eliminar materia?')) {
        await ApiService.delete(`/materias/${id}`);
        cargarMaterias();
    }
};