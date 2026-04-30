import ArticleCard from '../common/ArticleCard'
import Sidebar from '../Sidebar/Sidebar'
import './MainContent.css'

export default function MainContent() {
  const articles = [
    {
      id: '4',
      title: 'Análisis Técnico del Último Trimestre',
      image: '📊',
      category: 'Economía',
      author: 'Ana Martínez',
      views: 800,
    },
    {
      id: '5',
      title: 'Tendencias de Moda Este Verano',
      image: '👗',
      category: 'Entretenimiento',
      author: 'Sofia Ruiz',
      views: 650,
    },
    {
      id: '6',
      title: 'Equipo Local Gana el Campeonato',
      image: '⚽',
      category: 'Deportes',
      author: 'Tom Brown',
      views: 2100,
    },
    {
      id: '7',
      title: 'Nuevo Modelo de Smartphone Anunciado',
      image: '📱',
      category: 'Tecnología',
      author: 'David Chen',
      views: 1800,
    },
  ]

  return (
    <section className="main-content">
      <div className="container">
        <div className="layout-grid">
          <div className="articles-list">
            <h2 className="section-title">Últimos Artículos</h2>
            <div className="articles-grid">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </section>
  )
}
