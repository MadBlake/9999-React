import TrendingArticles from './TrendingArticles'
import Newsletter from './Newsletter'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <TrendingArticles />
      <Newsletter />
    </aside>
  )
}
