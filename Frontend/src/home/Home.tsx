import RotatingText from 'ReactBits/RotatingText/RotatingText';
import './style/Home.css';
import { useNavigate } from 'react-router-dom';
import Carrusel from '../components/Carrusel/Carrusel'
export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="eco-home-body">

            <header className="eco-header">
                <h1 className="eco-header-title">Eco Ruta</h1>
                <h2 className="eco-header-subtitle">
                    
                </h2>
            </header>

            <RotatingText
                texts={['Disfruta', 'Viaja', 'Divierte', 'Conecta!']}
                className="eco-rotating-text"
            />

            <section className="eco-intro-section">
                <p className="eco-intro-text">
                    Planifica tus rutas eco-amigables y contribuye al medio ambiente usando transporte público, caminando o en bicicleta.
                </p>
                <button className="eco-btn-comenzar" onClick={() => navigate('/iniciosesion')}>
                    ¡Comienza tu aventura!
                </button>
            </section>

            <section className="eco-transporte-container">
              
            </section>

            <footer className="eco-footer">
                <p className="eco-footer-text">Eco Ruta © 2025 - Movilidad sostenible para todos</p>
            </footer>

        </div>
    );
}
