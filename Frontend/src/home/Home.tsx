import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
export default function Home() {
    const navigate =useNavigate()
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    

    return (
        <div className="overflow-x-hidden">
            {/* HERO SECTION - PANTALLA COMPLETA */}
            <section className="relative h-screen bg-gradient-to-br from-emerald-200 via-teal-800 to-cyan-400 text-white overflow-hidden">
                {/* Elementos decorativos animados */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-32 w-64 h-64 bg-emerald-400 opacity-10 rounded-full animate-pulse blur-xl"></div>
                    <div className="absolute top-40 right-32 w-48 h-48 bg-cyan-400 opacity-15 rounded-full animate-pulse delay-500 blur-xl"></div>
                    <div className="absolute bottom-32 left-1/2 w-80 h-80 bg-teal-400 opacity-10 rounded-full animate-pulse delay-1000 blur-xl"></div>
                    <div className="absolute bottom-20 right-20 w-56 h-56 bg-emerald-300 opacity-10 rounded-full animate-pulse delay-700 blur-xl"></div>
                </div>

                {/* Patrón de puntos */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>

                {/* Contenido principal del hero */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="transform transition-all duration-1000 ease-out" 
                         style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
                        
                        {/* Logo/Título principal */}
                        <div className="mb-8">
                            <h1 className="text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-200 bg-clip-text text-transparent animate-pulse">
                                🌱
                            </h1>
                            <h2 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
                                ECO RUTA
                            </h2>
                        </div>

                        {/* Subtítulo */}
                        <p className="text-2xl md:text-3xl text-emerald-100 font-light mb-12 max-w-4xl leading-relaxed">
                            Revoluciona tu forma de moverte
                            <br />
                            <span className="text-white font-medium">Planifica • Muévete • Transforma el planeta</span>
                        </p>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <button
                                className="group relative bg-gradient-to-r from-emerald-500 to-teal-500
                                 hover:from-emerald-400 hover:to-teal-400
                                  text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl 
                                  hover:shadow-emerald-500/25 transform hover:scale-110 transition-all duration-500 ease-out overflow-hidden"
                                onClick={() => navigate('/iniciosesion')} 
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <span className="relative flex items-center space-x-4">
                                    <span className="text-3xl group-hover:animate-spin">🚀</span>
                                    <span>Comenzar Aventura</span>
                                </span>
                            </button>
                            
                            <button className="group text-white font-semibold py-4 px-8 rounded-full text-lg border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300">
                                <span className="flex items-center space-x-3">
                                    <span className="text-2xl group-hover:animate-bounce">🎥</span>
                                    <span>Ver Demo</span>
                                </span>
                            </button>
                        </div>

                        {/* Indicadores de scroll */}
                        <div className="animate-bounce">
                            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                            </div>
                            <p className="text-sm text-white/70 mt-2">Desliza para descubrir</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE OPCIONES DE TRANSPORTE - PANTALLA COMPLETA */}
            <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center py-20 px-12  w-screen justify-center ">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h3 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
                            Elige tu 
                            <span className="bg-gradient-to-r from-emerald-200 to-teal-600 bg-clip-text text-transparent "> superRuta</span>
                        </h3>
                        <p className="text-xl text-gray-600 max-w-7xl mx-auto text-center">
                            Cada forma de movilidad sostenible es un paso hacia un futuro más verde
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        {/* Bicicleta */}
                        <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-6 hover:rotate-2 transition-all duration-500 overflow-hidden border-4 border-emerald-100 hover:border-emerald-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-emerald-600/10"></div>
                            <div className="relative p-12 text-center h-full">
                                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                                    <span className="text-6xl text-white">🚴‍♀️</span>
                                </div>
                                <h4 className="text-3xl font-bold text-gray-800 mb-6">Bicicleta</h4>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    Velocidad, ejercicio y aire puro. La combinación perfecta para conquistar la ciudad mientras cuidas tu salud y el planeta.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold text-sm">0% Emisiones</span>
                                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold text-sm">Cardio Power</span>
                                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold text-sm">Libertad Total</span>
                                </div>
                            </div>
                        </div>

                        {/* Transporte público */}
                        <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-6 hover:rotate-2 transition-all duration-500 overflow-hidden border-4 border-blue-100 hover:border-blue-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-600/10"></div>
                            <div className="relative p-12 text-center h-full">
                                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                                    <span className="text-6xl text-white">🚌</span>
                                </div>
                                <h4 className="text-3xl font-bold text-gray-800 mb-6">Transporte Público</h4>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    Conecta con tu comunidad mientras ahorras dinero y reduces el tráfico. El poder de la movilidad colectiva.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">Super Económico</span>
                                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">Red Completa</span>
                                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">Tiempo Útil</span>
                                </div>
                            </div>
                        </div>

                        {/* Caminata */}
                        <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-6 hover:rotate-2 transition-all duration-500 overflow-hidden border-4 border-amber-100 hover:border-amber-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-600/10"></div>
                            <div className="relative p-12 text-center h-full">
                                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                                    <span className="text-6xl text-white">🚶‍♂️</span>
                                </div>
                                <h4 className="text-3xl font-bold text-gray-800 mb-6">Caminata</h4>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    El método más puro y natural. Conecta con tu entorno, medita en movimiento y fortalece tu cuerpo paso a paso.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm">100% Natural</span>
                                    <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm">Cero Costo</span>
                                    <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm">Mindfulness</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE ESTADÍSTICAS - PANTALLA COMPLETA */}
            <section className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white flex items-center py-20 px-4 relative overflow-hidden">
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0">
                    <div className="absolute top-32 left-20 w-96 h-96 bg-emerald-400 opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-32 right-20 w-80 h-80 bg-cyan-400 opacity-5 rounded-full blur-3xl"></div>
                </div>

                <div className=" mx-auto text-center relative z-17  w-screen">
                    <div className="mb-10">
                        <h3 className="text-3xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent  ">
                            Impacto Real
                        </h3>
                        <p className="text-xl text-emerald-100 max-w-9xl mx-auto">
                            Números que demuestran cómo juntos estamos cambiando el mundo
                        </p>
                    </div>

                    <div className=" grid md:grid-cols-3 gap-5 max-w-9xl mx-auto text-center ">
                        <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 hover:bg-white/15 transform hover:scale-110 transition-all duration-500 w ">
                            <div className="text-7xl font-black text-emerald-300 mb-6 group-hover:animate-pulse">85%</div>
                            <div className="text-xl text-emerald-100 font-semibold mb-3">Menos Emisiones CO₂</div>
                            <p className="text-emerald-200 text-sm">Comparado con transporte privado</p>
                        </div>
                        
                        <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 hover:bg-white/15 transform hover:scale-110 transition-all duration-500">
                            <div className="text-7xl font-black text-emerald-300 mb-6 group-hover:animate-pulse">24K</div>
                            <div className="text-xl text-emerald-100 font-semibold mb-3">Eco-Warriors</div>
                            <p className="text-emerald-200 text-sm">Usuarios activos transformando la ciudad</p>
                        </div>
                        
                        <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 hover:bg-white/15 transform hover:scale-110 transition-all duration-500">
                            <div className="text-7xl font-black text-emerald-300 mb-6 group-hover:animate-pulse">5.2M</div>
                            <div className="text-xl text-emerald-100 font-semibold mb-3">Rutas Sostenibles</div>
                            <p className="text-emerald-200 text-sm">Viajes ecológicos completados</p>
                        </div>
                    </div>
<br />
                    <div className="mt-20">
                        <button className="group bg-gradient-to-r from-white/20 to-emerald-500/20 hover:from-white/30 hover:to-emerald-500/30 text-black font-bold py-6 px-12 rounded-full text-xl border-2 border-white/30 hover:border-white transition-all duration-300 ">
                            <span className="flex items-center space-x-3">
                                <span className="text-2xl group-hover:animate-spin">🌍</span>
                                <span>Únete al Movimiento</span>
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER MEJORADO */}
            <footer className="bg-gray-900 text-white py-16  justify-center">
                <div className="container mx-auto px-8 ">
                    <div className="text-center mb-12">
                        <h4 className="text-4xl font-bold mb-4">
                            <span className="text-emerald-400">🌱</span> ECO RUTA
                        </h4>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Construyendo un futuro sostenible, un viaje a la vez
                        </p>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-10 text-center pr-1">
                        <p className="text-gray-400  ml-auto">
                            © 2025 Eco Ruta - Juntos hacia un planeta más verde - Alex jhoan  and Santiago Rengifo🌍
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Hecho con 💚 para las generaciones futuras
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}