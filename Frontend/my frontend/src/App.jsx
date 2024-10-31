import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";

import Home from "./pages/Home.jsx";
import MainLayout from "./layouts/MainLayouts.jsx";
import LoginForm from "./components/LoginForm.jsx";
import ForgotPassowrd from "./components/ForgotPassword.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import AdminSidebar from "./components/AdminSidebar.jsx";
import AddProduct from "./components/AddProduct.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import UserList from "./components/UserList.jsx";
import Cart from "./pages/Cart.jsx";
import FooterOrder from "./components/FooterOrder.jsx";
import FooterShipping from "./components/FooterShipping.jsx";
import FooterReturning from "./components/FooterReturning.jsx";
import FooterPayPal from "./components/FooterPaypal.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassowrd />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product-category/:category" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<FooterOrder />} />
        <Route path="/shipping" element={<FooterShipping />} />
        <Route path="/returning" element={<FooterReturning />} />
        <Route path="/PayPal" element={<FooterPayPal />} />
        <Route path="/admin-panel" element={<AdminPanel />}>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="AdminSidebar" element={<AdminSidebar />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="user-list" element={<UserList />} />
        </Route>
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
