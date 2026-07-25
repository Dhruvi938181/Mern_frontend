import React, { useEffect, useState } from "react";
import { FaUser, FaGift, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* TOP BLACK STRIP */}
      <div style={{ height: "22px", background: "black" }} className="d-none d-sm-block"></div>

      {/* OFFER BAR */}
      <div className="d-none d-sm-block bg-black text-white">
        <div className="container d-flex text-center small py-2">
          <div className="flex-fill border-end border-secondary">FREE SHIPPING ON ALL ORDERS</div>
          <div className="flex-fill border-end border-secondary">DISCOUNT 50% FOR ORDERS OVER $99</div>
          <div className="flex-fill">CALL US 123-456-789</div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
        {/* LEFT SIDE */}
        <div className="d-none d-sm-block">
          {user ? (
            <>
              {/* Same styling as Sign in */}
              <span className="text-dark text-decoration-none">{user.firstName}</span>

              <span className="mx-2">|</span>

              <span onClick={handleLogout} style={{ cursor: "pointer" }} className="text-dark text-decoration-none">
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-dark text-decoration-none">
                <FaUser className="me-1" /> Sign in
              </Link>

              <span className="mx-2">|</span>

              <Link to="/register" className="text-dark text-decoration-none">
                Register
              </Link>
            </>
          )}
        </div>

        {/* CENTER LOGO */}
        <div>
          <img src="https://cdn11.bigcommerce.com/s-apwcvcac2o/images/stencil/178x70/logo-black_1492511941__55514.original.png" alt="logo" height="60" />
        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center">
          <Link to="/gift" className="text-decoration-none text-dark me-3 ms-5">
            <FaGift className="me-1" /> Gift Certificates
          </Link>

          {/* Search Wrapper */}
          <div className="d-flex align-items-center me-3">
            {showSearch && <input type="text" placeholder="Search..." className="form-control me-2 search-input" />}

            <FaSearch style={{ cursor: "pointer" }} onClick={() => setShowSearch(!showSearch)} />
          </div>

          <FaShoppingCart style={{ cursor: "pointer" }} onClick={() => navigate("/cart")} />
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom">
        <div className="container">
          {/* Toggle Button (Mobile only) */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
            <ul className="navbar-nav gap-sm-4 fw-semibold text-center w-100 justify-content-center">
              <li className="nav-item py-2">SHOP ALL</li>
              <li className="nav-item py-2">BATH</li>
              <li className="nav-item py-2">GARDEN</li>
              <li className="nav-item py-2">BLOG</li>
              <li className="nav-item py-2">CONTACT US</li>
            </ul>
            {/* User Info for Mobile */}
            <div className="d-sm-none text-center py-3 border-bottom">
              {user ? (
                <>
                  <div className="fw-semibold">{user.firstName}</div>
                  <div onClick={handleLogout} style={{ cursor: "pointer" }} className="text-danger small">
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="d-block text-dark py-1">
                    Sign in
                  </Link>
                  <Link to="/register" className="d-block text-dark py-1">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
