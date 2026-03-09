import { memo } from 'react'
// Component fill memoitzat
const BotoMemoitzat = memo(function BotoMemoitzat({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  console.log(`🟡 Renderitzat: "${label}"`)
  return (
    <button onClick={onClick} style={{ margin: 4 }}>
      {label}
    </button>
  )
})

export default BotoMemoitzat;