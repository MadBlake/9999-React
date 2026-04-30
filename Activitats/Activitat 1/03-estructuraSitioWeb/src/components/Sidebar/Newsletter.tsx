import './Newsletter.css'

export default function Newsletter() {
  return (
    <div className="newsletter">
      <h3>Suscribirse al Newsletter</h3>
      <p className="newsletter-description">
        Recibe las últimas noticias directamente en tu correo
      </p>
      <form className="newsletter-form">
        <input 
          type="email" 
          placeholder="Tu correo electrónico"
          required
        />
        <button type="submit">Suscribirse</button>
      </form>
    </div>
  )
}
