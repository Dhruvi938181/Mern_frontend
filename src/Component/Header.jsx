import React, { useEffect, useState } from "react";
import { FaGift, FaSearch, FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("User parse error:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    let rawName = user.firstName || user.name || (user.email ? user.email.split("@")[0] : "User");
    let cleanName = rawName.replace(/[0-9]/g, "").trim();
    if (cleanName.length > 0) {
      return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    }
    return "User";
  };

  return (
    <>
      <div style={{ height: "22px", background: "black" }}></div>

      <div className="bg-black text-white">
        <div className="container d-flex text-center small py-2 offer-bar-text">
          <div className="flex-fill border-end border-secondary">FREE SHIPPING ON ALL ORDERS</div>
          <div className="flex-fill border-end border-secondary">DISCOUNT 50% FOR ORDERS OVER $99</div>
          <div className="flex-fill">CALL US 123-456-789</div>
        </div>
      </div>

      <div className="border-bottom py-3 px-2 px-md-4 d-flex justify-content-between align-items-center header-main-box">
        <div className="header-left-text">
          {user ? (
            <>
              <span className="fw-bold text-dark me-1">Hi, {getUserDisplayName()}</span>
              <span className="mx-1">|</span>
              <span onClick={handleLogout} style={{ cursor: "pointer" }} className="text-dark fw-semibold">
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-dark text-decoration-none">
                <FaUser className="me-1 header-icon" /> Sign in
              </Link>

              <span className="mx-1">|</span>

              <Link to="/register" className="text-dark text-decoration-none">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="position-absolute start-50 translate-middle-x">
          <Link to="/">
            <img
              src="https://cdn11.bigcommerce.com/s-apwcvcac2o/images/stencil/178x70/logo-black_1492511941__55514.original.png"
              alt="logo"
              style={{
                height: "clamp(25px, 4vw, 50px)",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        <div className="d-flex align-items-center gap-2 gap-md-3">
          <Link to="/gift" className="text-dark text-decoration-none d-flex align-items-center header-action-icon" title="Gift">
            <FaGift />
          </Link>

          <div className="d-flex align-items-center header-action-icon">
            {showSearch && <input type="text" placeholder="Search..." className="form-control me-1 me-md-2 search-input" style={{ width: "80px", fontSize: "11px" }} />}
            <FaSearch style={{ cursor: "pointer" }} onClick={() => setShowSearch(!showSearch)} />
          </div>

          <div className="d-flex align-items-center header-action-icon" style={{ cursor: "pointer" }} onClick={() => navigate("/wishlist")} title="Wishlist">
            <FaHeart style={{ color: "#dc3545" }} />
          </div>

          <div className="d-flex align-items-center header-action-icon" style={{ cursor: "pointer" }} onClick={() => navigate("/cart")} title="Cart">
            <FaShoppingCart />
          </div>

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="text-dark text-decoration-none d-flex align-items-center header-action-icon" title="Admin">
              <FaUser />
            </Link>
          )}
        </div>
      </div>

      <nav className="bg-white border-bottom">
        <div className="container">
          <ul className="nav justify-content-center gap-sm-4 fw-semibold text-center w-100 nav-links-row m-0 list-unstyled d-flex py-2">
            <li className="nav-item">
              <Link to="/" className="nav-link p-0 text-dark">
                SHOP ALL
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link p-0 text-dark" style={{ cursor: "pointer" }}>
                HOME
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link p-0 text-dark" style={{ cursor: "pointer" }}>
                ABOUT
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link p-0 text-dark" style={{ cursor: "pointer" }}>
                BLOG
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link p-0 text-dark" style={{ cursor: "pointer" }}>
                CONTACT US
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;