import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../CSS/ProductInfo.css";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7800/api/products`)
      .then((res) => {
        const single = res.data.find((p) => p._id === id);
        setProduct(single);

        if (single) {
          const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          const exists = savedWishlist.some((item) => item._id === single._id);
          setIsWishlisted(exists);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find((item) => item._id === product._id);

    if (existingProduct) {
      const updatedCart = existingCart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCart = [...existingCart, { ...product, quantity }];
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    setShowModal(true);
  };

  const handleToggleWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const index = savedWishlist.findIndex((item) => item._id === product._id);

    if (index !== -1) {
      savedWishlist.splice(index, 1);
      setIsWishlisted(false);
      alert("Removed from Wishlist! ❤️");
    } else {
      savedWishlist.push(product);
      setIsWishlisted(true);
      alert("Added to Wishlist! ❤️");
    }

    localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "720px", objectFit: "cover" }} className="rounded-3 shadow-sm" />
        </div>

        {/* DETAILS */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <div className="d-flex align-items-center">
            <h5 className="text-danger fw-bold mb-0">₹{product.price}</h5>
            {product.oldPrice && (
              <h5 className="ms-3 mb-0">
                <span className="text-muted text-decoration-line-through">₹{product.oldPrice}</span>
              </h5>
            )}
          </div>

          <div className="mt-2">{"⭐".repeat(product.rating || 5)}</div>
          <p className="fork-sku mt-2">
            <strong>SKU:</strong> {product._id}
          </p>

          {/* COLORS */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-3">
              <strong>Colors:</strong>
              <div className="d-flex mt-2">
                {product.colors.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: c,
                      marginRight: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                    }}></span>
                ))}
              </div>
            </div>
          )}

          <hr />
          <h4 className="mt-1">Description:</h4>
          <p className="text-muted">{product.description}</p>

          {/* QUANTITY */}
          <div className="fork-quantity">
            <label className="fw-bold">QUANTITY:</label>
            <div className="mt-2 mb-3">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center border rounded-3 overflow-hidden bg-white shadow-sm" style={{ width: "130px", height: "45px" }}>
                  <button
                    type="button"
                    className="btn border-0 fw-bold px-3 text-dark h-100 d-flex align-items-center justify-content-center"
                    style={{ fontSize: "18px" }}
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                    −
                  </button>

                  <input
                    type="text"
                    className="form-control text-center border-0 fw-bold shadow-none p-0 h-100"
                    style={{ fontSize: "16px", backgroundColor: "transparent" }}
                    value={quantity}
                    readOnly
                  />

                  <button
                    type="button"
                    className="btn border-0 fw-bold px-3 text-dark h-100 d-flex align-items-center justify-content-center"
                    style={{ fontSize: "18px" }}
                    onClick={() => setQuantity(quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-dark px-4 py-2" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {/* WISHLIST BUTTON UPDATED WITH HANDLER */}
            <button className={`btn ${isWishlisted ? "btn-danger" : "btn-outline-dark"} d-flex align-items-center gap-2 px-4 py-2`} onClick={handleToggleWishlist}>
              {isWishlisted ? (
                <>
                  <FaHeart /> Wishlisted
                </>
              ) : (
                <>
                  <FaRegHeart /> Add to Wishlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ADD TO CART MODAL */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4 rounded-4 shadow">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Ok, {quantity} item(s) were added to your cart. What's next?</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <img src={product.image} alt={product.name} className="img-fluid rounded-3" style={{ height: "300px", objectFit: "cover" }} />
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <h4 className="fw-bold">{product.name}</h4>
                  <p className="fs-5 text-muted">
                    {quantity} × ₹{product.price}
                  </p>

                  <hr />

                  <button className="btn btn-dark w-100 mb-2 py-2 fw-semibold" onClick={() => navigate("/checkout")}>
                    PROCEED TO CHECKOUT
                  </button>

                  <button className="btn btn-outline-dark w-100 mb-2 py-2 fw-semibold" onClick={() => navigate("/")}>
                    CONTINUE SHOPPING
                  </button>

                  <button
                    className="btn btn-light border w-100 py-2 fw-semibold"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/cart");
                    }}>
                    VIEW OR EDIT YOUR CART
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

export default ProductInfo;
