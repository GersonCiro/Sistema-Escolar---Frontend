import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/Api';

function AsignacionesView() {
  const [currentType, setCurrentType] = useState('estudiante');
  const [usuarios, setUsuarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [materiaId, setMateriaId] = useState('');

  useEffect(() => {
    cargarOpcionesUsuarios('estudiante');
    cargarMaterias();
    cargarAsignaciones('estudiante');
  }, []);

  const cambiarTipo = (tipo) => {
    setCurrentType(tipo);
    cargarOpcionesUsuarios(tipo);
    cargarAsignaciones(tipo);
  };

  const cargarOpcionesUsuarios = async (tipo) => {
    try {
      const endpoint = tipo === 'estudiante' ? '/estudiantes' : '/profesores';
      const data = await ApiService.get(endpoint);
      setUsuarios(data || []);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const cargarMaterias = async () => {
    try {
      const data = await ApiService.get('/materias');
      setMaterias(data || []);
    } catch (error) {
      console.error('Error cargando materias:', error);
    }
  };

  const cargarAsignaciones = async (tipo) => {
    try {
      const endpoint = tipo === 'estudiante' ? '/asignaciones/estudiantes' : '/asignaciones/profesores';
      const data = await ApiService.get(endpoint);
      setAsignaciones(data || []);
    } catch (error) {
      console.error('Error cargando asignaciones:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId || !materiaId) {
      alert('Por favor seleccione ambos campos.');
      return;
    }

    try {
      const payload = {
        tipo: currentType,
        id_persona: parseInt(usuarioId),
        id_materia: parseInt(materiaId),
      };
      const result = await ApiService.post('/asignaciones', payload);
      if (result) {
        alert('✅ Asignación realizada con éxito');
        setUsuarioId('');
        setMateriaId('');
        await cargarAsignaciones(currentType);
      } else {
        alert('Error al realizar la asignación');
      }
    } catch (error) {
      console.error('Error realizando asignación:', error);
      alert('Error al realizar la asignación');
    }
  };

  const eliminarAsignacion = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Seguro que desea eliminar esta asignación?')) {
      try {
        const endpoint = `/asignaciones/${id}?tipo=${currentType}`;
        await ApiService.delete(endpoint);
        cargarAsignaciones(currentType);
      } catch (error) {
        console.error('Error eliminando asignación:', error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              ←
            </div>
            <span className="font-semibold text-gray-800">Volver</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Asignaciones de Materias</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                  📋
                </div>
                <h2 className="text-xl font-bold text-gray-900">Nueva Asignación</h2>
              </div>

              {/* Tipo Selector */}
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-sm font-semibold text-gray-700 mb-3">Tipo de Asignación:</p>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer hover:bg-purple-100 p-2 rounded transition">
                    <input
                      type="radio"
                      name="tipo"
                      value="estudiante"
                      checked={currentType === 'estudiante'}
                      onChange={() => cambiarTipo('estudiante')}
                      className="w-4 h-4 text-purple-600 cursor-pointer"
                    />
                    <span className="ml-3 text-gray-700 font-medium">👨‍🎓 Estudiante</span>
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-purple-100 p-2 rounded transition">
                    <input
                      type="radio"
                      name="tipo"
                      value="profesor"
                      checked={currentType === 'profesor'}
                      onChange={() => cambiarTipo('profesor')}
                      className="w-4 h-4 text-purple-600 cursor-pointer"
                    />
                    <span className="ml-3 text-gray-700 font-medium">👨‍🏫 Profesor</span>
                  </label>
                </div>
                <span id="badgeTipo" className="inline-flex items-center mt-3 px-3 py-1 rounded-full text-sm font-semibold text-purple-700 bg-purple-100">
                  {currentType === 'estudiante' ? '👨‍🎓 Estudiantes' : '👨‍🏫 Profesores'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label id="lblUsuario" className="block text-sm font-semibold text-gray-700 mb-2">
                    Seleccione {currentType === 'estudiante' ? 'Estudiante' : 'Profesor'}
                  </label>
                  <select
                    id="selUsuario"
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    required
                  >
                    <option value="">-- Seleccione --</option>
                    {usuarios.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nombre} {u.apellido}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Seleccione Materia</label>
                  <select
                    id="selMateria"
                    value={materiaId}
                    onChange={(e) => setMateriaId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    required
                  >
                    <option value="">-- Seleccione --</option>
                    {materias.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  ✓ Asignar
                </button>
              </form>
            </div>
          </div>

          {/* Tabla */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
                <h2 className="text-xl font-bold text-gray-900">Asignaciones Registradas</h2>
                <p className="text-sm text-gray-600 mt-1">{asignaciones.length} asignación(es) registrada(s)</p>
              </div>
              
              <div className="overflow-x-auto">
                {asignaciones.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">No hay asignaciones registradas</p>
                    <p className="text-sm mt-1">Comienza agregando una en el formulario</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre Completo</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Materia</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="tablaAsignaciones" className="divide-y divide-gray-100">
                      {asignaciones.map((item) => (
                        <tr key={item.id} className="hover:bg-purple-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-purple-700 bg-purple-100">
                              #{item.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{item.nombre} {item.apellido}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-emerald-700 bg-emerald-100">
                              {item.materia}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => eliminarAsignacion(item.id)}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              🗑️ Desasignar
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

export default AsignacionesView;
