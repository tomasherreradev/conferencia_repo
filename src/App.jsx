import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import disertanteImg from './assets/disertante.png';
import backgroundImg from './assets/background.webp';
import './App.css';

// Componente de cuenta regresiva
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 6 de noviembre de 2025 a las 18:00 (hora local)
    const countdownDate = new Date(2025, 10, 6, 18, 0, 0).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-item">
        <span className="countdown-value">{timeLeft.days}</span>
        <span className="countdown-label">Días</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{timeLeft.hours}</span>
        <span className="countdown-label">Horas</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{timeLeft.minutes}</span>
        <span className="countdown-label">Minutos</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{timeLeft.seconds}</span>
        <span className="countdown-label">Segundos</span>
      </div>
    </div>
  );
};
// Componente de sección con animación
const AnimatedSection = ({ children, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};

// Componente principal de la aplicación
function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    institucion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por inscribirte! Pronto nos pondremos en contacto contigo.');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      institucion: ''
    });
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="hero-overlay">
          <div className="container">
            <h1>Conferencia Judicial</h1>
            <h2>Por especialista en Psicología Jurídica y Forense</h2>
            <p className="date-location">6 de Noviembre 2025 | 18:00 Hrs | Teatro María Belén Brizuela</p>
            <a href="https://forms.gle/aUTDtp7TpAtYjpNe8" target="_blank" className="cta-button">Inscríbete Ahora</a>
          </div>
        </div>
      </header>

      {/* Countdown Section */}
      <AnimatedSection className="countdown-section">
        <div className="container">
          <h2 Style="color: #fff;">¡El evento comienza en!</h2>
          <Countdown />
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection className="about-section">
        <div className="container">
          <h2>Acerca del Evento</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Experto en Psicología del Testimonio y Perfilación Criminal y autor del libro "Actuación Profesional del Perito Psicólogo de Parte"</p>
              <p>
                Durante la conferencia se abordarán en profundidad los aspectos fundamentales de la actuación pericial psicológica en el ámbito judicial, analizando las funciones, responsabilidades y límites del psicólogo forense en los distintos procesos legales. Se explorará el rol del perito de parte en la elaboración de informes técnicos, la intervención en audiencias y la presentación de conclusiones ante los tribunales, así como las herramientas y metodologías más utilizadas para garantizar la validez científica de las evaluaciones.
                Además, se reflexionará sobre los principales desafíos éticos, deontológicos y técnicos que enfrenta el profesional en su práctica cotidiana, destacando la importancia de la objetividad, la rigurosidad metodológica y la formación continua en el campo de la psicología jurídica y forense.
              </p>
            </div>
            <div className="disertante-card">
              <div className="disertante-img">
                <img src={disertanteImg} alt="Dr. Francisco Javier Ortuño Guerrero" />
              </div>
              <div className="disertante-info">
                <h3>Lic. Pablo Soares de Lima</h3>
                <p className="cargo">Perito Psicólogo</p>
                <p className="especialidad">Psicólogo Forense Perito Psicólogo de Parte</p>
                <p className="ubicacion">Buenos Aires, Provincia de Buenos Aires, Argentina</p>
                <div className="redes-sociales">
                  {/* <a href="#" className="social-icon">FB</a> */}
                  <a href="https://www.instagram.com/pablo.soaresdelima/?hl=es-la" className="social-icon">IG</a>
                  <a href="https://www.linkedin.com/in/pablo-mart%C3%ADnez-soares-de-lima-50127424/?originalSubdomain=ar" className="social-icon">IN</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>



      {/* Contact Section */}
      <AnimatedSection className="contact-section">
        <div className="container">
          <h2>Ubicación del Evento</h2>
          <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> <span>Teatro María Belén Brizuela</span></p>
            {/* <p><i className="fas fa-map-pin"></i> <span>Ver en Maps</span></p> */}
          </div>
          <div className="map-container">
            <iframe 
              src="https://maps.google.com/maps?q=-28.554515552484595,-66.81377258197793&z=17&output=embed&markers=color:red%7C-28.554515552484595,-66.81377258197793"
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del evento - Teatro María Belén Brizuela">
            </iframe>
            <p style={{textAlign: 'center', marginTop: '1rem'}}>
              <a 
                href="https://www.google.com/maps/place/28%C2%B033'16.3%22S+66%C2%B044'49.6%22W/@-28.5545156,-66.8163475,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d-28.5545156!4d-66.8137726" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                {/* <i className="fas fa-external-link-alt"></i> Ver en Google Maps */}
              </a>
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>Conferencia Judicial</h3>
              <p>6 de Noviembre 2025</p>
            </div>
            <div className="footer-links">
              {/* <a href="#">Términos y Condiciones</a>
              <a href="#">Política de Privacidad</a>
              <a href="#">Contacto</a> */}
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Conferencia Judicial</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
