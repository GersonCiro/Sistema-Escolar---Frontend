import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/Api';

function ProfesoresView() {
  const [profesores, setProfesores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    cargarProfesores();
  }, []);

  const cargarProfesores = async () => {
    try {
      const data = await ApiService.get('/profesores');
      setProfesores(data);
    } catch (error) {
      console.error('Error cargando profesores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { nombre, apellido };
      const result = await ApiService.post('/profesores', data);
      if (result) {
        setNombre('');
        setApellido('');
        await cargarProfesores();
      } else {
        alert('Error al guardar profesor');
      }
    } catch (error) {
      console.error('Error guardando profesor:', error);
      alert('Error al guardar profesor');
    }
  };

  const eliminarProfesor = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Eliminar profesor?')) {
      try {
        await ApiService.delete(`/profesores/${id}`);
        cargarProfesores();
      } catch (error) {
        console.error('Error eliminando profesor:', error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              ←
            </div>
            <span className="font-semibold text-gray-800">Volver</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Profesores</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <h2 className="text-xl font-bold text-gray-900">Nuevo Profesor</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Carlos"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="López"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  + Agregar Profesor
                </button>
              </form>
            </div>
          </div>

          {/* Tabla */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                <h2 className="text-xl font-bold text-gray-900">Lista de Profesores</h2>
                <p className="text-sm text-gray-600 mt-1">{profesores.length} profesor(es) registrado(s)</p>
              </div>
              
              <div className="overflow-x-auto">
                {profesores.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">No hay profesores registrados aún</p>
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
                      {profesores.map((prof) => (
                        <tr key={prof.id} className="hover:bg-indigo-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-indigo-700 bg-indigo-100">
                              #{prof.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{prof.nombre} {prof.apellido}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => eliminarProfesor(prof.id)}
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

export default ProfesoresView;
