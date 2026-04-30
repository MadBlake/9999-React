import HeroSection from '../components/sections/HeroSection'
import FeaturedArticles from '../components/sections/FeaturedArticles'
import MainContent from '../components/sections/MainContent'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedArticles />
      <MainContent />
    </div>
  )
}
