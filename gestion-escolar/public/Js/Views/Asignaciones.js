document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cargar Estudiantes
    const estudiantes = await ApiService.get('/estudiantes');
    const selEst = document.getElementById('selEstudiante');
    selEst.innerHTML = '<option value="">-- Seleccione Alumno --</option>';
    estudiantes.forEach(e => {
        selEst.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
    });

    // 2. Cargar Materias
    const materias = await ApiService.get('/materias');
    const selMat = document.getElementById('selMateria');
    selMat.innerHTML = '<option value="">-- Seleccione Materia --</option>';
    materias.forEach(m => {
        selMat.innerHTML += `<option value="${m.id}">${m.nombre}</option>`;
    });
});

document.getElementById('formAsignacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        estudiante_id: document.getElementById('selEstudiante').value,
        materia_id: document.getElementById('selMateria').value
    };

    if (!data.estudiante_id || !data.materia_id) {
        return alert("Por favor seleccione ambos campos");
    }

    // Verifica si la ruta en tu backend es /matriculas o /asignaciones
    const exito = await ApiService.post('/matriculas', data); 
    
    if(exito) {
        alert("✅ Matricula realizada con éxito");
    }
});