import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Sobre Nosotros</h4>
            <ul>
              <li><a href="#about">Acerca de</a></li>
              <li><a href="#careers">Carreras</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacidad</a></li>
              <li><a href="#terms">Términos</a></li>
              <li><a href="#cookies">Cookies</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Redes Sociales</h4>
            <div className="social-links">
              <a href="#twitter">🐦</a>
              <a href="#facebook">📘</a>
              <a href="#instagram">📷</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 NewsPortal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
