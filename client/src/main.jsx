import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.jsx';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SearchMovies from './pages/SearchMovies'; 
import FavoriteMovies from './pages/FavoritedMovies';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    errorElement: <ErrorPage />,

    children: [
      
      {
        path: '/',
        element: <Home />
      }, 
      {
        path: '/search-books',
        element: <SearchBooks />
      }, 
      {
        path: '/saved-books',
        element: <SavedBooks />
      },
      {
        path: '/search-movies',
        element: <SearchMovies />
      },

      {
        path: '/favorite-movies',
        element: <FavoriteMovies />
      },

      

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
