import React, { useEffect, useState } from "react";
import { Trophy, Medal, Award, Star, TrendingUp, Crown, Users, Target } from "lucide-react";

interface Medalla {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
}

interface Usuario {
  Nombre: string;
  Apellido: string;
}

interface UsuarioRanking {
  id_usuario: number;
  total_puntos: string;
  usuario: Usuario;
  medalla: string;
}

const medallasDisponibles: Medalla[] = [
  { id: 1, nombre: "Oro", descripcion: "Medalla Oro", icono: "/img/oro.png" }, 
  { id: 2, nombre: "Plata", descripcion: "Medalla Plata", icono: "/img/plata.png" },
  { id: 3, nombre: "Bronce", descripcion: "Medalla Bronce", icono: "/img/bronce.png" },
];

const Recompensas: React.FC = () => {
  const [ranking, setRanking] = useState<UsuarioRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulación de datos para demo (reemplaza con tu API)
  useEffect(() => {
    const cargarRanking = async () => {
      try {
        // Simular datos para demo
        const mockData: UsuarioRanking[] = [
          { id_usuario: 1, total_puntos: "2450", usuario: { Nombre: "Ana", Apellido: "García" }, medalla: "Oro" },
          { id_usuario: 2, total_puntos: "2100", usuario: { Nombre: "Carlos", Apellido: "López" }, medalla: "Plata" },
          { id_usuario: 3, total_puntos: "1850", usuario: { Nombre: "María", Apellido: "Rodríguez" }, medalla: "Bronce" },
          { id_usuario: 4, total_puntos: "1650", usuario: { Nombre: "Diego", Apellido: "Martín" }, medalla: "Bronce" },
          { id_usuario: 5, total_puntos: "1420", usuario: { Nombre: "Sofia", Apellido: "Herrera" }, medalla: "Bronce" },
        ];
        
        setTimeout(() => {
          setRanking(mockData);
          setLoading(false);
        }, 1000);

        // Descomenta esto para usar tu API real:
        // const response = await api.get<UsuarioRanking[]>("/sistemalogros/ranking");
        // setRanking(response.data);
      } catch (err) {
        console.error("Error al cargar ranking:", err);
        setError("No se pudo cargar el ranking. Intenta nuevamente.");
        setLoading(false);
      }
    };

    cargarRanking();
  }, []);

  const getPosicionIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1: return <Medal className="w-6 h-6 text-gray-400" />;
      case 2: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{index + 1}</span>;
    }
  };

  const getPosicionColors = (index: number) => {
    switch (index) {
      case 0: return "from-yellow-400 to-yellow-600 shadow-yellow-200";
      case 1: return "from-gray-300 to-gray-500 shadow-gray-200";
      case 2: return "from-amber-400 to-amber-600 shadow-amber-200";
      default: return "from-blue-400 to-blue-600 shadow-blue-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Cargando recompensas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-2">⚠️</div>
        <p className="text-red-800 font-medium">{error}</p>
      </div>
    );
  }

  const topUser = ranking[0];
  const totalUsuarios = ranking.length;
  const puntosPromedio = ranking.reduce((sum, user) => sum + parseInt(user.total_puntos), 0) / totalUsuarios;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">🏆 Recompensas y Logros</h2>
            <p className="text-purple-100">Compite y gana increíbles recompensas</p>
          </div>
          <Trophy className="w-16 h-16 text-yellow-300" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Mis Puntos</p>
              <p className="text-2xl font-bold text-gray-900">{topUser?.total_puntos || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsuarios}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(puntosPromedio)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {ranking.length >= 3 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg w-screen">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">🥇 Top 3 Champions</h3>
          <div className="flex items-end justify-center space-x-4">
            
            {/* Segundo lugar */}
            <div className="text-center">
              <div className={`bg-gradient-to-t ${getPosicionColors(1)} rounded-lg p-4 mb-3 shadow-lg`}>
                <Medal className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold">{ranking[1].total_puntos}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 h-20 flex items-center">
                <p className="text-sm font-medium text-gray-700">{ranking[1].usuario.Nombre}</p>
              </div>
            </div>

            {/* Primer lugar */}
            <div className="text-center">
              <div className={`bg-gradient-to-t ${getPosicionColors(0)} rounded-lg p-6 mb-3 shadow-lg`}>
                <Crown className="w-10 h-10 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-lg">{ranking[0].total_puntos}</p>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 h-24 flex items-center">
                <p className="font-bold text-gray-800">{ranking[0].usuario.Nombre}</p>
              </div>
            </div>

            {/* Tercer lugar */}
            <div className="text-center">
              <div className={`bg-gradient-to-t ${getPosicionColors(2)} rounded-lg p-4 mb-3 shadow-lg`}>
                <Award className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold">{ranking[2].total_puntos}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 h-20 flex items-center">
                <p className="text-sm font-medium text-gray-700">{ranking[2].usuario.Nombre}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ranking Completo */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            Ranking Completo
          </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {ranking.map((user, index) => {
            const medalla = medallasDisponibles.find(m => m.nombre === user.medalla);
            return (
              <div 
                key={user.id_usuario} 
                className="p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                      {getPosicionIcon(index)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.usuario.Nombre} {user.usuario.Apellido}
                      </p>
                      <p className="text-sm text-gray-500">Usuario #{user.id_usuario}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{user.total_puntos}</p>
                      <p className="text-xs text-gray-500">puntos</p>
                    </div>
                    
                    <div className="w-16 h-16 flex items-center justify-center">
                      {medalla ? (
                        <div className="relative group">
                          <img
                            src={medalla.icono}
                            alt={medalla.descripcion}
                            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
                            onError={(e) => {
                              e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${user.medalla === 'Oro' ? '#FFD700' : user.medalla === 'Plata' ? '#C0C0C0' : '#CD7F32'}"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="12">${user.medalla}</text></svg>`;
                            }}
                          />
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {medalla.descripcion}
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs text-gray-500">Sin medalla</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recompensas;