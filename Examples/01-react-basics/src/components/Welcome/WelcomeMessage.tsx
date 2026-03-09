interface WelcomeMessageProps {
  courseName: string
  showDetails: boolean
}

function WelcomeMessage({ courseName, showDetails }: WelcomeMessageProps) {
  return (
    <section className="welcome-message">
      <p className="course-intro">
        Estás aprendiendo <strong>{courseName}</strong> con React y TypeScript.
      </p>
      
      {showDetails && (
        <div className="details-panel">
          <h3>📚 Lo que aprenderás:</h3>
          <ul>
            <li>✅ Componentes funcionales</li>
            <li>✅ Props y tipado con TypeScript</li>
            <li>✅ Estado con useState</li>
            <li>✅ Comunicación entre componentes</li>
            <li>✅ Renderizado condicional</li>
            <li>✅ Manejo de eventos</li>
          </ul>
        </div>
      )}
    </section>
  )
}

export default WelcomeMessage
