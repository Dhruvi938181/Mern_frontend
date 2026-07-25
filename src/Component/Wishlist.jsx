import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaTrashAlt, 
  FaShoppingCart, 
  FaHeart, 
  FaArrowLeft, 
  FaCheckCircle 
} from "react-icons/fa";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist items from LocalStorage
  const loadWishlist = () => {
    const items = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(items);
  };

  useEffect(() => {
    loadWishlist();

    // Storage change listener (cross-tab sync ke liye)
    window.addEventListener("storage", loadWishlist);
    return () => window.removeEventListener("storage", loadWishlist);
  }, []);

  // Remove Item
  const handleRemove = (id) => {
    const updated = wishlistItems.filter((item) => (item._id || item.id) !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Clear All Wishlist
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      setWishlistItems([]);
      localStorage.removeItem("wishlist");
    }
  };

  // Add to Cart
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = product._id || product.id;
    const exists = cart.some((item) => (item._id || item.id) === productId);

    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to Cart! 🛒");
    } else {
      alert("Product is already in your cart!");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container">

        {/* HEADER SECTION */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 pb-3 border-bottom bg-white p-3 p-md-4 rounded-3 shadow-sm">
          <div>
            <h2 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2 fs-3">
              <FaHeart className="text-danger" /> My Wishlist
            </h2>
            <p className="text-muted small mb-0">
              You have <span className="fw-bold text-dark">{wishlistItems.length}</span> items in your wishlist
            </p>
          </div>

          <div className="d-flex gap-2 mt-3 mt-sm-0">
            {wishlistItems.length > 0 && (
              <button 
                onClick={handleClearAll}
                className="btn btn-outline-danger btn-sm px-3 fw-semibold rounded-pill"
              >
                Clear Wishlist
              </button>
            )}
            <Link 
              to="/" 
              className="btn btn-dark btn-sm px-3 fw-semibold rounded-pill d-flex align-items-center gap-2"
            >
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* EMPTY STATE */}
        {wishlistItems.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-4 bg-white">
            <div className="mb-3">
              <FaHeart className="text-muted opacity-25" style={{ fontSize: "65px" }} />
            </div>
            <h4 className="fw-bold text-dark">Your Wishlist is Empty!</h4>
            <p className="text-muted small mb-4">
              Explore our products and save your favorites to view them later.
            </p>
            <div>
              <Link to="/" className="btn btn-dark rounded-pill px-4 py-2 fw-bold shadow-sm">
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          /* CART-LIKE TABLE & CARD LIST */
          <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
            
            {/* DESKTOP TABLE VIEW (d-none d-md-block) */}
            <div className="table-responsive d-none d-md-block">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr className="text-uppercase small fw-bold text-muted">
                    <th style={{ width: "40%" }} className="ps-4">Product Details</th>
                    <th style={{ width: "20%" }}>Price</th>
                    <th style={{ width: "15%" }}>Stock Status</th>
                    <th style={{ width: "25%" }} className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item) => {
                    const id = item._id || item.id;
                    return (
                      <tr key={id}>
                        {/* PRODUCT INFO */}
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.image || item.imageUrl || "https://via.placeholder.com/80"}
                              alt={item.name}
                              className="rounded-3 border"
                              style={{ width: "70px", height: "70px", objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="fw-bold mb-1 text-dark text-truncate" style={{ maxWidth: "250px" }}>
                                {item.name}
                              </h6>
                              <small className="text-muted">SKU: {id.slice(-6)}</small>
                            </div>
                          </div>
                        </td>

                        {/* PRICE */}
                        <td>
                          <div className="fw-bold text-dark fs-6">₹{item.price}</div>
                          {item.oldPrice && (
                            <small className="text-muted text-decoration-line-through">
                              ₹{item.oldPrice}
                            </small>
                          )}
                        </td>

                        {/* STOCK */}
                        <td>
                          <span className="badge bg-success-subtle text-success d-inline-flex align-items-center gap-1 border border-success-subtle px-2 py-1">
                            <FaCheckCircle className="small" /> In Stock
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td className="text-end pe-4">
                          <div className="d-flex align-items-center justify-content-end gap-2">
                           
                            <button
                              onClick={() => handleRemove(id)}
                              className="btn fs-3 btn-sm rounded-2 p-2"
                              title="Remove item"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW (d-md-none) */}
            <div className="d-md-none p-3">
              {wishlistItems.map((item) => {
                const id = item._id || item.id;
                return (
                  <div key={id} className="border-bottom py-3 last-no-border">
                    <div className="d-flex gap-3">
                      <img
                        src={item.image || item.imageUrl || "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="rounded-3 border"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                          <button
                            onClick={() => handleRemove(id)}
                            className="btn btn-link text-danger p-0 border-0"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>

                        <div className="fw-bold text-dark fs-6 mb-2">₹{item.price}</div>

                        <button
                          onClick={() => handleAddToCart(item)}
                          className="btn btn-dark btn-sm w-100 rounded-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        >
                          <FaShoppingCart /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;