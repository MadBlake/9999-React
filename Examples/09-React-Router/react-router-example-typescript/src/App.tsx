import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Components/AppLayout';
import Clothes from './Pages/Clothes';
import ClotheStyle from './Pages/ClotheStyle';
import NotFound from './Pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: ':type',
        element: <Clothes />,
        children: [
          {
            path: ':clotheStyle',
            element: <ClotheStyle />,
          },
        ],
      },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
