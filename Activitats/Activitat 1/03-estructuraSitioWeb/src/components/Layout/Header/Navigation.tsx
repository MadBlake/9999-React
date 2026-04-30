import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLinks />
      <MobileMenu />
    </nav>
  )
}
