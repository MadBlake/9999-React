import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>Page not found :(</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
};

export default NotFound;
