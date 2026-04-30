import './TrendingArticles.css'

export default function TrendingArticles() {
  const trendingArticles = [
    'Crypto Bounces Back After Market Decline',
    'Nueva Vacuna Demuestra Resultados Prometedores',
    'Silicon Valley Invierte Más en Startups',
    'Cambio Climático: Nuevos Datos Alarmantes',
    'Moda Sostenible es la Nueva Tendencia',
  ]

  return (
    <div className="trending-articles">
      <h3>Tendencias</h3>
      <ul className="trending-list">
        {trendingArticles.map((title, index) => (
          <li key={index}>
            <span className="trending-number">{index + 1}</span>
            <a href={`#${index}`}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
