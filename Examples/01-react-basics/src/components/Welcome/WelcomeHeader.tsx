interface WelcomeHeaderProps {
  userName: string
  visitCount: number
}

function WelcomeHeader({ userName, visitCount }: WelcomeHeaderProps) {
  return (
    <header className="welcome-header">
      <h1>👋 ¡Bienvenido, {userName}!</h1>
      <span className="visit-badge">
        Visita #{visitCount}
      </span>
    </header>
  )
}

export default WelcomeHeader
