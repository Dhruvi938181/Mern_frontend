import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBoxOpen, FaUsers, FaPlusCircle, FaStore, FaShieldAlt, FaSync, FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    let parsedUser = null;
    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser);
        setAdminUser(parsedUser);
      } catch (err) {
        console.error("User parsing error", err);
      }
    }

    if (!token || !parsedUser || parsedUser.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }

    const fetchDashboardData = async () => {
      try {
        let productData = [];
        try {
          const res = await axios.get("http://localhost:7800/products");
          productData = res.data;
        } catch {
          const res = await axios.get("http://localhost:7800/api/products");
          productData = res.data;
        }

        if (Array.isArray(productData)) {
          setTotalProducts(productData.length);
        } else if (productData?.products && Array.isArray(productData.products)) {
          setTotalProducts(productData.products.length);
        }

        const userRes = await axios.get("http://localhost:7800/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userRes && Array.isArray(userRes.data)) {
          setTotalUsers(userRes.data.length);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-dark mb-3" role="status"></div>
        <h6 className="fw-semibold text-secondary">Loading Dashboard...</h6>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-md-row bg-light min-vh-100">
      <Sidebar />

      <div className="p-3 p-sm-4 p-md-5 flex-grow-1 w-100 overflow-x-hidden">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
              <h2 className="fw-bold text-dark mb-0 fs-3 fs-md-2">Dashboard Overview</h2>
              <span className="badge bg-dark rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1">
                <FaShieldAlt size={11} /> Admin
              </span>
            </div>
            <p className="text-muted small mb-0">
              Welcome back, <span className="fw-semibold text-dark">{adminUser?.firstName || "Admin"}</span>!
            </p>
          </div>

          <button className="btn btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-2" onClick={() => window.location.reload()}>
            <FaSync size={13} /> Refresh
          </button>
        </div>

        <div className="row g-3 g-md-4 mb-4">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                  <FaBoxOpen className="fs-3" />
                </div>
                <span className="badge bg-primary-subtle text-primary fw-semibold px-2 py-1 rounded">Catalog</span>
              </div>
              <h6 className="text-muted fw-semibold mb-1">Total Products</h6>
              <h2 className="fw-bold text-dark mb-0">{totalProducts}</h2>
              <div className="mt-3 pt-3 border-top">
                <Link to="/admin/products" className="text-primary text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1">
                  Manage Catalog <FaArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                  <FaUsers className="fs-3" />
                </div>
                <span className="badge bg-success-subtle text-success fw-semibold px-2 py-1 rounded">Accounts</span>
              </div>
              <h6 className="text-muted fw-semibold mb-1">Registered Users</h6>
              <h2 className="fw-bold text-dark mb-0">{totalUsers}</h2>
              <div className="mt-3 pt-3 border-top">
                <span className="text-muted small">Active customer accounts</span>
              </div>
            </div>
          </div>
        </div>

        <h5 className="fw-bold text-dark mb-3">Quick Controls</h5>
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg-4">
            <Link to="/admin/add-product" className="card border-0 shadow-sm rounded-4 p-3 text-decoration-none bg-white h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-dark text-white rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                  <FaPlusCircle className="fs-4" />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">Add New Product</h6>
                  <small className="text-muted d-block">Insert items into store</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <Link to="/admin/products" className="card border-0 shadow-sm rounded-4 p-3 text-decoration-none bg-white h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-secondary text-white rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                  <FaBoxOpen className="fs-4" />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">Product Inventory</h6>
                  <small className="text-muted d-block">Edit, search, or delete</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <Link to="/" className="card border-0 shadow-sm rounded-4 p-3 text-decoration-none bg-white h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-info bg-opacity-20 text-info-emphasis rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                  <FaStore className="fs-4" />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">Visit Store</h6>
                  <small className="text-muted d-block">Preview live website</small>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
