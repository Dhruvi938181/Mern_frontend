import { Route, Routes } from "react-router-dom";
import "./App.css";
import Forgot from "./Component/Forgot";
import GiftCertificate from "./Component/GiftCertificate";
import Header from "./Component/Header";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Slider from "./Component/Slider";
import BannerGrid from "./Component/BannerGrid";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import ProductInfo from "./Component/ProductInfo";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";
function App() {
  return (
    <div>
      <Header />
      <Routes>
          <Route
          path="/"
          element={
            <>
              <Slider />
              {/* <BannerGrid/> */}

           
              <Home/>
        
            </>
          }
        />
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/product/:id" element={<ProductInfo/>}></Route>
        <Route path="/gift" element={<GiftCertificate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
