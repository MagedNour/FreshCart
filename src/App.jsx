
import './App.css'
import Register from './assets/Components/Register/Register';
import Login from './assets/Components/Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './assets/Components/Layout/Layout.jsx';
import Home from './assets/Components/Home/Home.jsx';
import Products from './assets/Components/Products/Products.jsx';
import Cart from './assets/Components/Cart/Cart..jsx';
import Categories from './assets/Components/Categories/Categories.jsx';
import Brands from './assets/Components/Brands/Brands.jsx';
import Notfound from './assets/Components/Notfound/Notfound.jsx';
import AuthContextProvider from './Contexts/AuthContext.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "products", element: <Products /> },
        { path: "cart", element: <Cart /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "*", element: <Notfound /> },

      ]
    }
  ])


  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
