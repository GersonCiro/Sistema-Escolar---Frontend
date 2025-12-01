import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EstudiantesView from './components/EstudiantesView';
import ProfesoresView from './components/ProfesoresView';
import MateriasView from './components/MateriasView';
import AsignacionesView from './components/AsignacionesView';

// --- COMPONENTE DEL MENÚ PRINCIPAL (DASHBOARD) ---
function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Navbar minimalista */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/educacion.png" alt="Logo Sistema Escolar" className="w-10 h-10 flex-shrink-0" />
            <span className="font-bold text-xl text-gray-800">Sistema Escolar</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Panel de <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Control</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gestiona de forma eficiente estudiantes, profesores, materias y asignaciones en tu institución educativa.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          
          {/* Card Estudiantes - Azul */}
          <Link to="/estudiantes" className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="p-8 text-center">
              <div className="mb-4 text-5xl">👨‍🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Estudiantes</h3>
              <p className="text-sm text-gray-600">Registra y gestiona</p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-blue-600 font-semibold text-sm">
                Ver más →
              </div>
            </div>
          </Link>

          {/* Card Profesores - Indigo */}
          <Link to="/profesores" className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
            <div className="p-8 text-center">
              <div className="mb-4 text-5xl">👨‍🏫</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Profesores</h3>
              <p className="text-sm text-gray-600">Administra docentes</p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-indigo-600 font-semibold text-sm">
                Ver más →
              </div>
            </div>
          </Link>

          {/* Card Materias - Verde */}
          <Link to="/materias" className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="p-8 text-center">
              <div className="mb-4 text-5xl">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Materias</h3>
              <p className="text-sm text-gray-600">Gestiona asignaturas</p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-green-600 font-semibold text-sm">
                Ver más →
              </div>
            </div>
          </Link>

          {/* Card Asignaciones - Púrpura */}
          <Link to="/asignaciones" className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            <div className="p-8 text-center">
              <div className="mb-4 text-5xl">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Asignaciones</h3>
              <p className="text-sm text-gray-600">Asigna matrículas</p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-purple-600 font-semibold text-sm">
                Ver más →
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center border-t border-gray-200 bg-white bg-opacity-50">
        <p className="text-gray-600 text-sm">&copy; 2025 Sistema Escolar - Sistema de Gestión Educativa</p>
      </footer>
    </div>
  );
}

// --- CONFIGURACIÓN DE RUTAS ---
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/estudiantes" element={<EstudiantesView />} />
        <Route path="/profesores" element={<ProfesoresView />} />
        <Route path="/materias" element={<MateriasView />} />
        <Route path="/asignaciones" element={<AsignacionesView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;