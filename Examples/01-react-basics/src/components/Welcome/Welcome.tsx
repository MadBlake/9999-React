import { useState } from 'react'
import WelcomeHeader from './WelcomeHeader'
import WelcomeMessage from './WelcomeMessage'
import WelcomeActions from './WelcomeActions'
import './Welcome.css'

interface WelcomeProps {
  userName: string
  courseName: string
}

function Welcome({ userName, courseName }: WelcomeProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [visitCount, setVisitCount] = useState(1)

  const handleToggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleIncrementVisit = () => {
    setVisitCount(visitCount + 1)
  }

  return (
    <div className="welcome-container">
      <WelcomeHeader 
        userName={userName} 
        visitCount={visitCount}
      />
      
      <WelcomeMessage 
        courseName={courseName}
        showDetails={showDetails}
      />
      
      <WelcomeActions 
        showDetails={showDetails}
        onToggleDetails={handleToggleDetails}
        onIncrementVisit={handleIncrementVisit}
      />
    </div>
  )
}

export default Welcome
