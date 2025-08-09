import RotatingText from 'ReactBits/RotatingText/RotatingText';
import './style/Home.css';

export default function Home() {
  return (
    <div className="body-eco-home">

      <header className="header">
      
        <h1 className="titulo-eco">Bienvenido a Eco Ruta</h1>
        <h2 className="subtitulo-eco">
           <img src="../img/casquito.png" alt="casquito-insano" className='casquito-img' />
            <img src="../img/caminar.png" alt="casquito-insano" className='caminar-img' />
        </h2>
      </header>
      
       <RotatingText
            texts={['Disfruta', 'Viaja', 'Divierte', 'Conecta!']}
            className="rotating-text"
          />

      <section className="intro">
        <p>
          Planifica tus rutas eco-amigables y contribuye al medio ambiente usando transporte público, caminando o en bicicleta.
        </p>
        <button className="btn-comenzar">¡Comienza tu aventura!</button>
      </section>

      <section className="transporte-container">
        <div className="transporte-card bus">
          <img src="https://cdn-icons-png.flaticon.com/512/61/61231.png" alt="Bus" />
          <h3>En Transporte Publico!</h3>
          <p>Reduce emisiones y viaja cómodo por la ciudad.</p>
        </div>
        <div className="transporte-card caminar">
          <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Caminata" />
          <h3>Caminando</h3>
          <p>Cuida tu salud y disfruta el paisaje urbano.</p>
        </div>
        <div className="transporte-card bicicleta">
          <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Bicicleta" />
          <h3>En Bicicleta</h3>
          <p>Muévete rápido, sin contaminar y ejercítate.</p>
        </div>
      </section>

      <footer className="footer">
        <p>Eco Ruta © 2025 - Movilidad sostenible para todos</p>
      </footer>

    </div>
  );
}
