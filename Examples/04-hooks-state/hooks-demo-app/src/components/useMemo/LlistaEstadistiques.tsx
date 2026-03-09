import { memo } from 'react'

// Component fill pesat memoitzat
const LlistaEstadistiques = memo(function LlistaEstadistiques({
  total,
  mitjana,
}: {
  total: number
  mitjana: number
}) {
  console.log('🔴 LlistaEstadistiques renderitzada')
  return (
    <div className="flex-row" style={{ gap: 20 }}>
      <div>
        <span style={{ color: '#888' }}>Total: </span>
        <span className="badge info">{total}</span>
      </div>
      <div>
        <span style={{ color: '#888' }}>Mitjana puntuació: </span>
        <span className="badge success">{mitjana.toFixed(1)}</span>
      </div>
    </div>
  )
})

export default LlistaEstadistiques;