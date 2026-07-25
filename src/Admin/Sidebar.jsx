import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChartPie, FaBoxOpen, FaPlusCircle, FaArrowLeft, FaUserShield, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaChartPie className="me-3 fs-5" />,
    },
    {
      title: "Products List",
      path: "/admin/products",
      icon: <FaBoxOpen className="me-3 fs-5" />,
    },
    {
      title: "Add Product",
      path: "/admin/add-product",
      icon: <FaPlusCircle className="me-3 fs-5" />,
    },
  ];

  return (
    <>
      <div className="d-md-none bg-dark text-white p-3 d-flex justify-content-between align-items-center w-100 position-sticky top-0 z-3 shadow">
        <div className="d-flex align-items-center gap-2">
          <FaUserShield className="text-primary fs-4" />
          <span className="fw-bold">AdminPanel</span>
        </div>
        <button className="btn btn-outline-light border-0 fs-4 py-0" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && <div className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50" style={{ zIndex: 1040 }} onClick={() => setIsOpen(false)} />}

      <div
        className={`d-flex flex-column justify-content-between p-3 text-white shadow
          ${isOpen ? "position-fixed top-0 start-0 h-100" : "d-none d-md-flex position-sticky top-0"}
        `}
        style={{
          width: "260px",
          minWidth: "260px",
          height: "100vh",
          backgroundColor: "#1e1e2d",
          zIndex: 1050,
        }}>
        <div>
          <div className="d-flex align-items-center justify-content-between px-2 py-3 mb-3 border-bottom border-secondary border-opacity-25">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center">
                <FaUserShield className="fs-4" />
              </div>
              <div>
                <h5 className="fw-bold mb-0 text-white" style={{ letterSpacing: "0.5px" }}>
                  AdminPanel
                </h5>
                <small className="text-muted" style={{ fontSize: "11px" }}>
                  E-COMMERCE CONTROL
                </small>
              </div>
            </div>

            <button className="btn text-white-50 d-md-none fs-5 p-0" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="nav nav-pills flex-column gap-2">
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${active ? "bg-primary text-white fw-bold shadow-sm" : "text-white-50"}`}
                  style={{
                    backgroundColor: active ? "#0d6efd" : "transparent",
                  }}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-top border-secondary border-opacity-25 d-flex flex-column gap-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 py-2 fw-semibold"
            style={{ fontSize: "14px" }}>
            <FaArrowLeft size={14} /> Back to Website
          </Link>

          <button onClick={handleLogout} className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 py-2 fw-semibold" style={{ fontSize: "14px" }}>
            <FaSignOutAlt size={14} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
