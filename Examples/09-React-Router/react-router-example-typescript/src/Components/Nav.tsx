import { Link } from 'react-router-dom';

const Nav: React.FC = () => (
  <nav>
    <ul>
      <li>
        <Link to="/mens">Men's</Link>
      </li>
      <li>
        <Link to="/ladies">Ladies</Link>
      </li>
      <li>
        <Link to="/childs">Childs</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
