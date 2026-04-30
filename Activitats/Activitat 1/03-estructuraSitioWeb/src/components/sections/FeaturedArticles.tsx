import ArticleCard from '../common/ArticleCard'
import './FeaturedArticles.css'

export default function FeaturedArticles() {
  const featuredArticles = [
    {
      id: '1',
      title: 'Avances Revolucionarios en Inteligencia Artificial',
      image: '🤖',
      category: 'Tecnología',
      author: 'Juan Smith',
      views: 1200,
    },
    {
      id: '2',
      title: 'Nuevas Políticas de Sostenibilidad Global',
      image: '🌍',
      category: 'Política',
      author: 'María García',
      views: 950,
    },
    {
      id: '3',
      title: 'El Mercado Cripto Recupera Confianza',
      image: '💰',
      category: 'Economía',
      author: 'Carlos López',
      views: 1500,
    },
  ]

  return (
    <section className="featured-articles">
      <div className="container">
        <h2 className="section-title">Artículos Destacados</h2>
        <div className="featured-grid">
          {featuredArticles.map(article => (
            <ArticleCard key={article.id} article={article} featured />
          ))}
        </div>
      </div>
    </section>
  )
}
