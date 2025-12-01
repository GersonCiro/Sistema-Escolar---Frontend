document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar-component");
    if (navbarContainer) {
        navbarContainer.innerHTML = `
        <nav class="bg-slate-800 text-white shadow-lg">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                    <a href="../index.html" class="text-xl font-bold text-blue-400 hover:text-white transition">
                        🏫 Sistema Escolar
                    </a>
                    <ul class="flex space-x-6">
                        <li><a href="../index.html" class="hover:text-blue-300 transition">Inicio</a></li>
                        <li><a href="estudiantes.html" class="hover:text-blue-300 transition">Estudiantes</a></li>
                        <li><a href="profesores.html" class="hover:text-blue-300 transition">Docentes</a></li>
                        <li><a href="materias.html" class="hover:text-blue-300 transition">Materias</a></li>
                        <li><a href="asignaciones.html" class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Asignaciones</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        `;
    }
});