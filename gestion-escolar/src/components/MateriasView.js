import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/Api';

function MateriasView() {
  const [materias, setMaterias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [materiaId, setMateriaId] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    try {
      const data = await ApiService.get('/materias');
      setMaterias(data);
    } catch (error) {
      console.error('Error cargando materias:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campo vacío
    if (!nombre.trim()) {
      alert('❌ Por favor ingresa el nombre de la materia');
      return;
    }
    
    // Si no está editando, validar que no exista duplicado
    if (!isEditing) {
      const materiaExistente = materias.some(
        mat => mat.nombre.toLowerCase() === nombre.toLowerCase()
      );
      
      if (materiaExistente) {
        alert('🚫 Esta materia ya está registrada en el sistema');
        return;
      }
    }
    
    try {
      const data = { nombre };
      let result;
      if (isEditing && materiaId) {
        result = await ApiService.put(`/materias/${materiaId}`, data);
        if (result) {
          alert('✅ Materia actualizada exitosamente');
        }
      } else {
        result = await ApiService.post('/materias', data);
        if (result) {
          alert('✅ Materia registrada exitosamente');
        }
      }
      if (result) {
        setNombre('');
        setMateriaId('');
        setIsEditing(false);
        await cargarMaterias();
      } else {
        alert('❌ Error al guardar materia');
      }
    } catch (error) {
      console.error('Error guardando materia:', error);
      alert('❌ Error al guardar materia');
    }
  };

  const iniciarEdicion = (materia) => {
    setMateriaId(materia.id);
    setNombre(materia.nombre);
    setIsEditing(true);
  };

  const resetForm = () => {
    setNombre('');
    setMateriaId('');
    setIsEditing(false);
  };

  const eliminarMateria = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Eliminar materia?')) {
      try {
        await ApiService.delete(`/materias/${id}`);
        cargarMaterias();
      } catch (error) {
        console.error('Error eliminando materia:', error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              ←
            </div>
            <span className="font-semibold text-gray-800">Volver</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Materias</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">
                  📚
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? `Editar Materia #${materiaId}` : 'Nueva Materia'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Materia</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="Matemáticas"
                    required
                  />
                </div>
                <button
                  type="submit"
                  id="btnSubmit"
                  className={`w-full text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isEditing
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500'
                      : 'bg-gradient-to-r from-emerald-600 to-green-500'
                  }`}
                >
                  {isEditing ? '✏️ Actualizar' : '+ Agregar Materia'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    id="btnCancel"
                    onClick={resetForm}
                    className="w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Tabla */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
                <h2 className="text-xl font-bold text-gray-900">Lista de Materias</h2>
                <p className="text-sm text-gray-600 mt-1">{materias.length} materia(s) registrada(s)</p>
              </div>
              
              <div className="overflow-x-auto">
                {materias.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">No hay materias registradas aún</p>
                    <p className="text-sm mt-1">Comienza agregando una en el formulario</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {materias.map((m) => (
                        <tr key={m.id} className="hover:bg-emerald-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-emerald-700 bg-emerald-100">
                              #{m.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{m.nombre}</p>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => iniciarEdicion(m)}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => eliminarMateria(m.id)}
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

export default MateriasView;
