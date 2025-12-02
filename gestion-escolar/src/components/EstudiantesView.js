import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/Api';

function EstudiantesView() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    try {
      const data = await ApiService.get('/estudiantes');
      setEstudiantes(data);
    } catch (error) {
      console.error('❌ Error cargando estudiantes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos vacíos
    if (!nombre.trim() || !apellido.trim()) {
      alert('❌ Por favor completa todos los campos');
      return;
    }
    
    // Validar si ya existe un estudiante con el mismo nombre y apellido
    const estudianteExistente = estudiantes.some(
      est => est.nombre.toLowerCase() === nombre.toLowerCase() && 
              est.apellido.toLowerCase() === apellido.toLowerCase()
    );
    
    if (estudianteExistente) {
      alert('🚫 Este estudiante ya está registrado en el sistema');
      return;
    }
    
    try {
      const data = { nombre, apellido };
      const result = await ApiService.post('/estudiantes', data);
      if (result) {
        alert('✅ Estudiante registrado exitosamente');
        setNombre('');
        setApellido('');
        await cargarEstudiantes();
      } else {
        alert('❌ Error al guardar estudiante');
      }
    } catch (error) {
      console.error('Error guardando estudiante:', error);
      alert('❌ Error al guardar estudiante');
    }
  };

  const eliminarEstudiante = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Eliminar estudiante?')) {
      try {
        await ApiService.delete(`/estudiantes/${id}`);
        cargarEstudiantes();
      } catch (error) {
        console.error('⚠️ Error eliminando estudiante:', error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              ←
            </div>
            <span className="font-semibold text-gray-800">Volver</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Estudiantes</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario - Lado Izquierdo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  👨‍🎓
                </div>
                <h2 className="text-xl font-bold text-gray-900">Nuevo Estudiante</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Juan"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Pérez"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  + Agregar Estudiante
                </button>
              </form>
            </div>
          </div>

          {/* Tabla - Lado Derecho */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <h2 className="text-xl font-bold text-gray-900">Lista de Estudiantes</h2>
                <p className="text-sm text-gray-600 mt-1">{estudiantes.length} estudiante(s) registrado(s)</p>
              </div>
              
              <div className="overflow-x-auto">
                {estudiantes.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">No hay estudiantes registrados aún</p>
                    <p className="text-sm mt-1">Comienza agregando uno en el formulario</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre Completo</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {estudiantes.map((est) => (
                        <tr key={est.id} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-blue-700 bg-blue-100">
                              #{est.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{est.nombre} {est.apellido}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => eliminarEstudiante(est.id)}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              🗑️ Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstudiantesView;
