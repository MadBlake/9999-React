import { useParams, Link, Outlet, Navigate } from 'react-router-dom';

const validTypes = ['mens', 'ladies', 'childs'] as const;
type ClothingType = typeof validTypes[number];

const titles: Record<ClothingType, string> = {
  mens: "Men's Clothing",
  ladies: "Ladies' Clothing",
  childs: "Children's Clothing",
};

const Clothes: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  if (!type || !validTypes.includes(type as ClothingType)) {
    return <Navigate to="/not-found" replace />;
  }

  const title = titles[type as ClothingType];

  return (
    <div>
      <h1>{title}</h1>

      {/* Lista de categorías */}
      <ul>
        <li>
          <Link to="outerwear">Outerwear</Link>
        </li>
        <li>
          <Link to="t-shirts">T-shirts</Link>
        </li>
      </ul>

      {/* Aquí se renderizan las subrutas */}
      <Outlet />
    </div>
  );
};

export default Clothes;
