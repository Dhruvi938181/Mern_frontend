import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaPlus, FaTag, FaRupeeSign, FaStar, FaPalette, FaImage, FaFileAlt, FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    badge: "NEW",
    rating: "5",
    colors: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedProduct = {
      ...product,
      price: Number(product.price),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      rating: Number(product.rating),
      colors: product.colors ? product.colors.split(",").map((c) => c.trim()) : [],
    };

    try {
      const res = await axios.post("https://mern-backend-j99c.onrender.com/products", formattedProduct);

      if (res.data.success || res.status === 200 || res.status === 201) {
        alert("Product Added Successfully! 🎉");
        setProduct({
          name: "",
          price: "",
          originalPrice: "",
          badge: "NEW",
          rating: "5",
          colors: "",
          description: "",
          image: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.message || "Product add nahi ho paya"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row bg-light min-vh-100 w-100">
      <Sidebar />

      <div className="p-3 p-sm-4 p-md-5 flex-grow-1 w-100" style={{ maxWidth: "1200px", minWidth: 0 }}>
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <div>
            <h2 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2 fs-3 fs-md-2">
              <FaPlus className="text-dark" /> Add New Product
            </h2>
            <p className="text-muted small mb-0">Fill in the details below to add a new item to your store catalog.</p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-7 col-xl-8">
            <div className="card border-0 shadow-sm rounded-4 p-3 p-sm-4 bg-white">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small">
                    <FaTag className="me-1" /> Product Name *
                  </label>
                  <input type="text" name="name" className="form-control rounded-3 py-2" placeholder="e.g. Modern Cotton Chair" value={product.name} onChange={handleChange} required />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label fw-semibold text-secondary small">
                      <FaRupeeSign className="me-1" /> Selling Price (₹) *
                    </label>
                    <input type="number" name="price" className="form-control rounded-3 py-2" placeholder="e.g. 1499" value={product.price} onChange={handleChange} required />
                  </div>

                  <div className="col-12 col-sm-6">
                    <label className="form-label fw-semibold text-secondary small">
                      <FaRupeeSign className="me-1" /> Original Price (₹)
                    </label>
                    <input type="number" name="originalPrice" className="form-control rounded-3 py-2" placeholder="e.g. 1999" value={product.originalPrice} onChange={handleChange} />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-4">
                    <label className="form-label fw-semibold text-secondary small">Badge</label>
                    <select name="badge" className="form-select rounded-3 py-2" value={product.badge} onChange={handleChange}>
                      <option value="NEW">NEW</option>
                      <option value="HOT">HOT</option>
                      <option value="SALE">SALE</option>
                      <option value="">None</option>
                    </select>
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="form-label fw-semibold text-secondary small">
                      <FaStar className="me-1 text-warning" /> Rating (1-5)
                    </label>
                    <input type="number" name="rating" min="1" max="5" className="form-control rounded-3 py-2" value={product.rating} onChange={handleChange} />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="form-label fw-semibold text-secondary small">
                      <FaPalette className="me-1" /> Hex Colors
                    </label>
                    <input type="text" name="colors" placeholder="#000000, #ffffff" className="form-control rounded-3 py-2" value={product.colors} onChange={handleChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary small">
                    <FaFileAlt className="me-1" /> Description *
                  </label>
                  <textarea
                    name="description"
                    className="form-control rounded-3"
                    rows="4"
                    placeholder="Provide a detailed description of the product..."
                    value={product.description}
                    onChange={handleChange}
                    required></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary small">
                    <FaImage className="me-1" /> Image URL *
                  </label>
                  <input type="url" name="image" className="form-control rounded-3 py-2" placeholder="https://example.com/image.jpg" value={product.image} onChange={handleChange} required />
                </div>

                <button type="submit" disabled={loading} className="btn btn-dark w-100 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2">
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="fs-5" /> Save Product
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
