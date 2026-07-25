import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaTrashAlt, FaPlus, FaSearch, FaSync, FaBoxOpen, FaStar } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:7800/api/products");
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data.products && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setDeletingId(id);
      try {
        await axios.delete(`http://localhost:7800/products/${id}`);
        setProducts(products.filter((item) => item._id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete product!");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredProducts = products.filter((prod) => prod.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="d-flex flex-column flex-md-row bg-light min-vh-100 w-100">
      <Sidebar />

      <div className="p-3 p-sm-4 p-md-5 flex-grow-1 w-100" style={{ maxWidth: "1300px", minWidth: 0 }}>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold text-dark mb-1 fs-3 fs-md-2">Product Inventory</h2>
            <p className="text-muted small mb-0">Manage, search, and delete products from your store catalog.</p>
          </div>

          <div className="d-flex flex-wrap gap-2 w-100 w-sm-auto justify-content-start justify-content-sm-end">
            <button className="btn btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-2" onClick={fetchProducts}>
              <FaSync className={loading ? "spin" : ""} /> Refresh
            </button>
            <Link to="/admin/add-product" className="btn btn-dark rounded-pill px-4 d-flex align-items-center gap-2 fw-semibold">
              <FaPlus /> Add Product
            </Link>
          </div>
        </div>

        <div className="row g-3 align-items-center mb-4">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="input-group bg-white rounded-pill border px-3 py-1 shadow-sm">
              <span className="input-group-text bg-transparent border-0 text-muted">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-0 shadow-none ps-0"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-7 text-start text-md-end">
            <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-bold">
              Showing {filteredProducts.length} of {products.length} Products
            </span>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-dark" role="status"></div>
                <p className="text-muted mt-2 mb-0">Fetching product inventory...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-5 px-3">
                <FaBoxOpen size={50} className="text-muted mb-3 opacity-50" />
                <h5 className="fw-bold text-dark">No Products Found</h5>
                <p className="text-muted small">Try searching with a different keyword or add new items.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light border-bottom text-secondary text-uppercase small">
                    <tr>
                      <th className="ps-3 ps-md-4" style={{ width: "70px" }}>
                        Item
                      </th>
                      <th>Product Info</th>
                      <th>Price</th>
                      <th className="d-none d-md-table-cell">Description</th>
                      <th className="text-end pe-3 pe-md-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((prod) => (
                      <tr key={prod._id}>
                        <td className="ps-3 ps-md-4">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="rounded-3 border"
                            width="50"
                            height="50"
                            style={{ objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/50?text=No+Img";
                            }}
                          />
                        </td>

                        <td>
                          <div className="fw-bold text-dark text-truncate" style={{ maxWidth: "200px" }}>
                            {prod.name}
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                            {prod.badge && (
                              <span className="badge bg-dark" style={{ fontSize: "10px" }}>
                                {prod.badge}
                              </span>
                            )}
                            <span className="text-warning small d-flex align-items-center gap-1">
                              <FaStar size={12} /> {prod.rating || 5}
                            </span>
                          </div>
                        </td>

                        <td className="text-nowrap">
                          <span className="fw-bold text-dark">₹{prod.price}</span>
                          {prod.originalPrice && (
                            <div className="text-muted text-decoration-line-through small" style={{ fontSize: "11px" }}>
                              ₹{prod.originalPrice}
                            </div>
                          )}
                        </td>

                        <td className="d-none d-md-table-cell text-muted small" style={{ maxWidth: "250px" }}>
                          <p className="text-truncate mb-0">{prod.description || "No description available"}</p>
                        </td>

                        <td className="text-end pe-3 pe-md-4">
                          <button className="btn r btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1" disabled={deletingId === prod._id} onClick={() => handleDelete(prod._id)}>
                            {deletingId === prod._id ? (
                              <span className="spinner-border spinner-border-sm" role="status"></span>
                            ) : (
                              <>
                                <FaTrashAlt size={12} />
                                <span className="d-none d-sm-inline"></span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
