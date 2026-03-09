import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">🎉 EventHub</span>
          <p>Tu plataforma de eventos favorita</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Plataforma</h4>
            <a href="#">Sobre nosotros</a>
            <a href="#">Contacto</a>
            <a href="#">FAQ</a>
          </div>
          
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Términos de uso</a>
            <a href="#">Privacidad</a>
            <a href="#">Cookies</a>
          </div>
          
          <div className="footer-column">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="#">📘</a>
              <a href="#">🐦</a>
              <a href="#">📸</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 EventHub. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
