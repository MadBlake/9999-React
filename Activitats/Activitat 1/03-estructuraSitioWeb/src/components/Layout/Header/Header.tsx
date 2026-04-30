import Logo from './Logo'
import Navigation from './Navigation'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-container">
          <Logo />
          <Navigation />
          <SearchBar />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
