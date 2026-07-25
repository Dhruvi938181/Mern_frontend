import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Slider from "./Component/Slider";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Forgot from "./Component/Forgot";
import GiftCertificate from "./Component/GiftCertificate";
import ProductInfo from "./Component/ProductInfo";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";

// Admin
import Dashboard from "./Admin/Dashboard";
import AddProduct from "./Admin/AddProduct";
import ProductList from "./Admin/ProductList";
import Wishlist from "./Component/Wishlist";

function App() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}

      <Routes>
        {/* User Routes */}
        <Route
          path="/"
          element={
            <>
              <Slider />
              <Home />
            </>
          }
        />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/gift" element={<GiftCertificate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ProductList />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
