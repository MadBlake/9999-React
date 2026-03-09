interface WelcomeActionsProps {
  showDetails: boolean
  onToggleDetails: () => void
  onIncrementVisit: () => void
}

function WelcomeActions({ 
  showDetails, 
  onToggleDetails, 
  onIncrementVisit 
}: WelcomeActionsProps) {
  return (
    <div className="welcome-actions">
      <button 
        className="btn btn-primary"
        onClick={onToggleDetails}
      >
        {showDetails ? '🙈 Ocultar detalles' : '👀 Ver detalles'}
      </button>
      
      <button 
        className="btn btn-secondary"
        onClick={onIncrementVisit}
      >
        🔄 Simular nueva visita
      </button>
    </div>
  )
}

export default WelcomeActions
