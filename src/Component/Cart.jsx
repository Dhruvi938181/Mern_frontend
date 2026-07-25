import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTrashAlt, FaShoppingBag, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import "../CSS/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const increase = (id) => {
    const updated = cartItems.map((item) => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decrease = (id) => {
    const updated = cartItems.map((item) => (item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const removeCart = () => {
    localStorage.removeItem("cart");
  };

  return (
    <div className="container my-5 px-3 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold mb-0">Shopping Cart</h2>
          <p className="text-muted small mb-0">
            You have {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Link to="/" className="btn btn-outline-dark btn-sm rounded-pill px-3 d-none d-sm-inline-flex align-items-center gap-2">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4 shadow-sm my-4">
          <div className="mb-3 text-muted">
            <FaShoppingBag size={60} className="opacity-50" />
          </div>
          <h4 className="fw-bold text-dark">Your cart feels a bit light!</h4>
          <p className="text-muted small">Explore our latest collections and add your favorite items.</p>
          <Link to="/" className="btn btn-dark rounded-pill px-4 py-2 mt-2 fw-semibold">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="d-none d-md-flex bg-light px-4 py-3 border-bottom text-muted fw-bold small text-uppercase">
                  <div style={{ width: "45%" }}>Product</div>
                  <div style={{ width: "20%" }} className="text-center">
                    Quantity
                  </div>
                  <div style={{ width: "20%" }} className="text-end">
                    Price
                  </div>
                  <div style={{ width: "15%" }} className="text-end">
                    Action
                  </div>
                </div>

                {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className={`p-3 p-md-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 ${index !== cartItems.length - 1 ? "border-bottom" : ""}`}>
                    <div className="d-flex align-items-center" style={{ flex: "1 1 45%" }}>
                      <img src={item.image} alt={item.name} className="rounded-3 border" width="80" height="80" style={{ objectFit: "cover" }} />
                      <div className="ms-3">
                        <h6 className="fw-bold mb-1 text-dark">{item.name}</h6>
                        <span className="text-muted small d-block">Unit Price: ₹{item.price}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between justify-content-md-center" style={{ flex: "1 1 20%" }}>
                      <span className="d-md-none text-muted small fw-semibold">Qty:</span>
                      <div className="input-group input-group-sm rounded-pill overflow-hidden border" style={{ width: "100px" }}>
                        <button className="btn btn-light border-0 fw-bold" onClick={() => decrease(item._id)}>
                          −
                        </button>
                        <span className="form-control text-center bg-white border-0 fw-semibold">{item.quantity}</span>
                        <button className="btn btn-light border-0 fw-bold" onClick={() => increase(item._id)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between justify-content-md-end" style={{ flex: "1 1 20%" }}>
                      <span className="d-md-none text-muted small fw-semibold">Total:</span>
                      <span className="fw-bold text-dark fs-6">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>

                    <div className="text-end" style={{ flex: "1 1 15%" }}>
                      <button className="btn btn-light btn-sm rounded-circle text-danger p-2 border-0" onClick={() => removeItem(item._id)} title="Remove Item">
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 text-start d-md-none">
              <Link to="/" className="btn btn-link text-dark text-decoration-none p-0 small fw-semibold">
                <FaArrowLeft className="me-1" /> Continue Shopping
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "90px" }}>
              <h5 className="fw-bold mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal</span>
                <span className="fw-bold text-dark">₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 text-secondary">
                <span>Shipping</span>
                <span className="text-success fw-bold">FREE</span>
              </div>

              <hr className="my-3 opacity-25" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold fs-5">Grand Total</span>
                <span className="fw-bold fs-4 text-danger">₹{subtotal.toFixed(2)}</span>
              </div>

              <button
                className="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow-sm"
                onClick={() => {
                  alert("Proceeding to checkout...");
                  removeCart();
                  navigate("/checkout");
                }}>
                PROCEED TO CHECKOUT
              </button>

              <div className="mt-4 pt-3 border-top text-center text-muted small d-flex align-items-center justify-content-center gap-2">
                <FaShieldAlt className="text-success" size={18} />
                <span>100% Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
