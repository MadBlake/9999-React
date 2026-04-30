import Header from './Header/Header'
import Footer from './Footer/Footer'
import HomePage from '../../pages/HomePage'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}
