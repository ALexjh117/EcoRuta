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

  useEffect(() => {
    const cargarRanking = async () => {
      try {
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
      case 0: return <Crown className="w-8 h-8 text-yellow-500" />;
      case 1: return <Medal className="w-8 h-8 text-gray-400" />;
      case 2: return <Award className="w-8 h-8 text-amber-600" />;
      default: return <span className="w-8 h-8 flex items-center justify-center text-gray-500 font-bold text-lg">{index + 1}</span>;
    }
  };

  const getPosicionColors = (index: number) => {
    switch (index) {
      case 0: return "from-yellow-400 to-yellow-600 shadow-yellow-300";
      case 1: return "from-gray-300 to-gray-500 shadow-gray-300";
      case 2: return "from-amber-400 to-amber-600 shadow-amber-300";
      default: return "from-blue-400 to-blue-600 shadow-blue-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">Cargando recompensas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-300 rounded-lg p-6 text-center max-w-lg mx-auto mt-8">
        <div className="text-red-600 mb-2 text-3xl">⚠️</div>
        <p className="text-red-800 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  const topUser = ranking[0];
  const totalUsuarios = ranking.length;
  const puntosPromedio = ranking.reduce((sum, user) => sum + parseInt(user.total_puntos), 0) / totalUsuarios;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-extrabold mb-1 leading-tight w-screen">🏆 Recompensas y Logros</h2>
          <p className="text-purple-200 text-lg max-w-md">Compite y gana increíbles recompensas que te motivarán a seguir mejorando cada día.</p>
        </div>
        <Trophy className="w-20 h-20 text-yellow-300" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 font-semibold text-base">Mis Puntos</p>
              <p className="text-3xl font-extrabold text-gray-900">{topUser?.total_puntos || 0}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 font-semibold text-base">Total Usuarios</p>
              <p className="text-3xl font-extrabold text-gray-900">{totalUsuarios}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-xl">
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 font-semibold text-base">Promedio</p>
              <p className="text-3xl font-extrabold text-gray-900">{Math.round(puntosPromedio)}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {ranking.length >= 3 && (
        <div className="bg-white rounded-3xl p-10 shadow-xl max-w-5xl mx-auto">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">🥇 Top 3 Champions</h3>
          <div className="flex items-end justify-center space-x-10">
            {/* Segundo lugar */}
            <div className="text-center">
              <div className={`bg-gradient-to-t ${getPosicionColors(1)} rounded-xl p-6 mb-4 shadow-lg`}>
                <Medal className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-bold text-xl">{ranking[1].total_puntos}</p>
              </div>
              <div className="bg-gray-100 rounded-xl p-5 h-28 flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-700">{ranking[1].usuario.Nombre}</p>
              </div>
            </div>

            {/* Primer lugar */}
            <div className="text-center">
              <div className={`bg-gradient-to-t ${getPosicionColors(0)} rounded-xl p-10 mb-4 shadow-lg`}>
                <Crown className="w-14 h-14 text-white mx-auto mb-4" />
                <p className="text-white font-bold text-2xl">{ranking[0].total_puntos}</p>
              </div>
              <div className="bg-yellow-50 border-4 border-yellow-300 rounded-xl p-5 h-32 flex items-center justify-center">
                <p className="font-extrabold text-2xl text-gray-800">{ranking[0].usuario.Nombre}</p>
              </div>
            </div>

            {/* Tercer lugar */}
            <div className="text-center">
              <div className={`bg-gradient-to-t ${getPosicionColors(2)} rounded-xl p-6 mb-4 shadow-lg`}>
                <Award className="w-10 h-10 text-white mx-auto mb-3" />
                <p className="text-white font-bold text-xl">{ranking[2].total_puntos}</p>
              </div>
              <div className="bg-gray-100 rounded-xl p-5 h-28 flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-700">{ranking[2].usuario.Nombre}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ranking Completo */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 border-b border-gray-300">
          <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
            <Target className="w-7 h-7 text-blue-600" />
            Ranking Completo
          </h3>
        </div>

        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {ranking.map((user, index) => {
            const medalla = medallasDisponibles.find(m => m.nombre === user.medalla);
            return (
              <div
                key={user.id_usuario}
                className="p-5 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
              >
                <div className="flex items-center space-x-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                    {getPosicionIcon(index)}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">
                      {user.usuario.Nombre} {user.usuario.Apellido}
                    </p>
                    <p className="text-sm text-gray-500">Usuario #{user.id_usuario}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-10">
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-900">{user.total_puntos}</p>
                    <p className="text-xs text-gray-500">puntos</p>
                  </div>

                  <div className="w-20 h-20 flex items-center justify-center relative">
                    {medalla ? (
                      <div className="relative group">
                        <img
                          src={medalla.icono}
                          alt={medalla.descripcion}
                          className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${user.medalla === 'Oro' ? '#FFD700' : user.medalla === 'Plata' ? '#C0C0C0' : '#CD7F32'}"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="12">${user.medalla}</text></svg>`;
                          }}
                        />
                        <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          {medalla.descripcion}
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm text-gray-500">Sin medalla</span>
                      </div>
                    )}
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
