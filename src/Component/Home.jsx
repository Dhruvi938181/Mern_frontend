import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [quantity, setQuantity] = useState(1);
  const [wishlistIds, setWishlistIds] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7800/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(saved.map((item) => item._id));
  };

  const handleToggleWishlist = (product, e) => {
    if (e) e.stopPropagation(); 
    let savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existsIndex = savedWishlist.findIndex((item) => item._id === product._id);

    if (existsIndex !== -1) {
      savedWishlist.splice(existsIndex, 1);
      alert("Removed from Wishlist! ❤️");
    } else {
      savedWishlist.push(product);
      alert("Added to Wishlist! ❤️");
    }

    localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
    setWishlistIds(savedWishlist.map((item) => item._id)); // UI State Update
  };

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === selectedProduct._id);

    if (existingProduct) {
      alert("Product already in cart");
      return;
    }

    const productToAdd = {
      ...selectedProduct,
      quantity: quantity,
    };

    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
    setSelectedProduct(null);
  };

  const filterOptions = ["ALL", "HOT", "NEW", "SALE"];

  const filteredProducts = products.filter((item) => {
    if (filter === "ALL") return true;
    return item.badge?.toUpperCase() === filter;
  });

  return (
    <div className="container mt-4">
      <div className="section-title text-center mb-4">
        <span>NEW PRODUCTS</span>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-2 mb-5 flex-wrap">
        {filterOptions.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`btn px-4 py-2 rounded-pill fw-semibold transition-all ${
              filter === item ? "btn-dark shadow-sm text-white" : "btn-outline-secondary border-0 text-dark"
            }`}
            style={{
              letterSpacing: "1px",
              fontSize: "14px",
              transition: "all 0.3s ease",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            const isWishlisted = wishlistIds.includes(item._id);

            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
                <div className="card product-card h-100 w-100" style={{ border: "none" }}>
                  {item.badge && <span className="badge bg-dark position-absolute">{item.badge}</span>}

                  <div className="image-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-img"
                      onClick={() => navigate(`/product/${item._id}`)}
                      style={{ cursor: "pointer" }}
                    />

                    <div className="product-icons">
                      <i className="fas fa-cart-arrow-down" onClick={() => navigate("/cart")}></i>
                      <i
                        className={`${isWishlisted ? "fas fa-heart text-danger" : "far fa-heart"}`}
                        onClick={(e) => handleToggleWishlist(item, e)}
                        style={{ cursor: "pointer" }}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      ></i>
                    </div>

                    <button
                      className="quick-view-btn"
                      onClick={() => {
                        setSelectedProduct(item);
                        setQuantity(1);
                      }}
                    >
                      QUICK VIEW
                    </button>
                  </div>

                  <div className="card-body">
                    <h5>{item.name}</h5>
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="text-danger fw-bold">₹{item.price}</span>{" "}
                        {item.originalPrice && (
                          <span className="text-muted text-decoration-line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="d-flex">
                        {item.colors?.map((c, i) => (
                          <span
                            key={i}
                            style={{
                              display: "inline-block",
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                              backgroundColor: c,
                              border: "1px solid #ddd",
                            }}
                          ></span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-1 ms-0 text-warning">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center py-5">
            <div className="mb-3">
              <i className="fas fa-box-open fa-4x text-muted opacity-50"></i>
            </div>
            <h4 className="text-muted fw-bold">Oops! No products found.</h4>
            <p className="text-secondary">
              There are currently no products in the <strong>{filter}</strong> category. Please check back later!
            </p>
            <button className="btn btn-outline-dark rounded-pill mt-3 px-4" onClick={() => setFilter("ALL")}>
              View All Products
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fork-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="fork-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fork-close" onClick={() => setSelectedProduct(null)}>
              ✕
            </button>

            <div className="fork-container">
              <div className="fork-left">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="fork-right">
                <h2 className="fork-title">{selectedProduct.name}</h2>
                <p className="fork-brand">OFS</p>

                <p className="fork-price text-danger" style={{ fontSize: "24px", fontWeight: "bold" }}>
                  ₹{selectedProduct.price}{" "}
                  {selectedProduct.originalPrice && (
                    <span className="text-muted text-decoration-line-through fs-5 ms-2" style={{ fontWeight: "normal" }}>
                      ₹{selectedProduct.originalPrice}
                    </span>
                  )}
                </p>

                <div className="mt-1 mb-2 text-warning fs-5">
                  {Array.from({ length: selectedProduct.rating || 5 }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>

                <p className="fork-sku">
                  <strong>SKU:</strong> {selectedProduct._id}
                </p>

                <div className="mt-3 mb-2">
                  <strong>Colors:</strong>
                  <div className="d-flex gap-2 mt-1">
                    {selectedProduct.colors &&
                      selectedProduct.colors.map((c, i) => (
                        <span
                          key={i}
                          style={{
                            display: "inline-block",
                            width: "25px",
                            height: "25px",
                            backgroundColor: c,
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                        ></span>
                      ))}
                  </div>
                </div>

                <hr />

                <h4 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "15px" }}>Description:</h4>
                <p className="fork-description">{selectedProduct.description}</p>

                <div className="product-quantity-wrapper my-3">
                  <label className="form-label fw-bold text-uppercase text-secondary small mb-2" style={{ letterSpacing: "1px" }}>
                    Quantity
                  </label>
                  <div className="d-flex align-items-center gap-2">
                    <div className="quantity-box d-flex align-items-center border rounded-3 p-1 bg-light" style={{ width: "130px" }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-light border-0 fw-bold px-2 py-1 shadow-none text-dark"
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                        style={{ width: "32px", height: "32px" }}
                      >
                        −
                      </button>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center border-0 bg-transparent fw-bold text-dark px-0"
                        value={quantity}
                        readOnly
                        style={{ width: "40px" }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-light border-0 fw-bold px-2 py-1 shadow-none text-dark"
                        onClick={() => setQuantity(quantity + 1)}
                        style={{ width: "32px", height: "32px" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="fork-buttons">
                  <button className="fork-cart" onClick={handleAddToCart}>
                    ADD TO CART
                  </button>
                  <button
                    className="fork-wish"
                    onClick={() => handleToggleWishlist(selectedProduct)}
                  >
                    {wishlistIds.includes(selectedProduct._id)
                      ? "REMOVE FROM WISHLIST ❤️"
                      : "ADD TO WISH LIST"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;