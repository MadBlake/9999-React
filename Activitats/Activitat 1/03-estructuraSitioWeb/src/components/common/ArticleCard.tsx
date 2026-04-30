import './ArticleCard.css'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    image: string
    category: string
    author: string
    views: number
  }
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article className={`article-card ${featured ? 'featured' : ''}`}>
      <div className="article-image">{article.image}</div>
      <div className="article-body">
        <span className="article-category">{article.category}</span>
        <h3 className="article-title">{article.title}</h3>
        <div className="article-meta">
          <span className="article-author">{article.author}</span>
          <span className="article-views">👁️ {article.views}</span>
        </div>
      </div>
    </article>
  )
}
