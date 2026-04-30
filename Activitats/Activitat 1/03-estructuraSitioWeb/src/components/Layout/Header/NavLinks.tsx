import './NavLinks.css'

export default function NavLinks() {
  const links = ['Inicio', 'Tecnología', 'Política', 'Economía', 'Deportes', 'Entretenimiento']

  return (
    <ul className="nav-links">
      {links.map(link => (
        <li key={link}>
          <a href={`#${link.toLowerCase()}`}>{link}</a>
        </li>
      ))}
    </ul>
  )
}
