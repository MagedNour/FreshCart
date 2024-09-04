
import './App.css'
import Register from './assets/Components/Register/Register';
import Login from './assets/Components/Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './assets/Components/Layout/Layout.jsx';
import Home from './assets/Components/Home/Home.jsx';
import Products from './assets/Components/Products/Products.jsx';
import Cart from './assets/Components/Cart/Cart.jsx';
import Categories from './assets/Components/Categories/Categories.jsx';
import Brands from './assets/Components/Brands/Brands.jsx';
import Notfound from './assets/Components/Notfound/Notfound.jsx';
import AuthContextProvider from './Contexts/authContext.jsx';
import ProtectedRoute from './assets/Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './assets/Components/ProductDetails/ProductDetails.jsx';
import { ToastContainer } from 'react-toastify';
import ShippingAddress from './assets/Components/ShippingAddress/ShippingAddress.jsx';
import Orders from './assets/Components/Orders/Orders.jsx';
import { Offline } from 'react-detect-offline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishList from './assets/Components/WishList/WishList.jsx';
import WishContextProvider from './Contexts/wishListContext.jsx';
import ForgotMyPassword from './assets/Components/ForgotMyPassword/ForgotMyPassword.jsx';
import Verify from './assets/Components/verify/Verify.jsx';
import ResetPassword from './assets/Components/ResetPassword/ResetPassword.jsx';
import CartContextProvider from './Contexts/cartCountContext.jsx';
import ProductsByBrand from './assets/Components/ProductsByBrand/ProductsByBrand.jsx';


function App() {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/FreshCart",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgotMyPassword", element: <ForgotMyPassword /> },
        { path: "verify", element: <Verify /> },
        { path: "resetYourPassword", element: <ResetPassword /> },
        { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: "wishList", element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: "shippingAddress/:cartId", element: <ProtectedRoute> <ShippingAddress /> </ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
        { path: "productDetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: "brands/products/:id", element: <ProtectedRoute> <ProductsByBrand /> </ProtectedRoute> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ]);


  return (
    <>
      <QueryClientProvider client={queryClient} >
        <AuthContextProvider>
          <CartContextProvider>
            <WishContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <ToastContainer />

              <Offline>
                <div className='fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200'>
                  You are offline (check your internet connection!)
                </div>
              </Offline>
            </WishContextProvider>
          </CartContextProvider>



        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>

    </>
  )
}

export default App
