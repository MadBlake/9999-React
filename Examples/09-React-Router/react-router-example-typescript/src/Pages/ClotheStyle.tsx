import { useParams, Navigate } from 'react-router-dom';

const validStyles = ['outerwear', 't-shirts'] as const;

const ClotheStyle: React.FC = () => {
  const { clotheStyle } = useParams<{ clotheStyle: string }>();

  if (!clotheStyle || !validStyles.includes(clotheStyle as typeof validStyles[number])) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div>
      <h2>{clotheStyle}</h2>
    </div>
  );
};

export default ClotheStyle;
