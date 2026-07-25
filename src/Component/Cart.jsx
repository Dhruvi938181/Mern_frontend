import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import "../CSS/Cart.css"
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const increase = (id) => {
    const updated = cartItems.map(item =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decrease = (id) => {
    const updated = cartItems.map(item =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
   const navigate = useNavigate();

   const removeCart=()=>{
    localStorage.removeItem("cart")
   }
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">
        Your Cart ({cartItems.length} items)
      </h2>

      {cartItems.length === 0 ? (
        <h4 className="text-center">Your cart is empty</h4>
      ) : (
        <div className="row">
          {/* LEFT SIDE - ITEMS */}
          <div className="d-none d-md-flex fw-bold border-bottom pb-2 mb-3 text-uppercase small">
  <div style={{ width: "32%" }}>Item</div>
  <div style={{ width: "15%" }}>Quantity</div>
  <div style={{ width: "35%" }}>Price</div>
  <div style={{ width: "20%" }}>Total</div>
</div>
          <div className="col-md-8">
            {cartItems.map(item => (
              <div key={item._id} className="d-flex align-items-center border-bottom py-3 cart-item">

                <img
                  src={item.image}
                  alt={item.name}
                  width="80"
                  height="80"
                  style={{ objectFit: "cover" }}
                />

                <div className="ms-3 flex-grow-1">
                  <h6>{item.name}</h6>
                  {/* <p>₹{item.price}</p> */}
                </div>

                <div className="d-flex align-items-center quantity-box">
                  <button
                    className="btn btn-light border"
                    onClick={() => decrease(item._id)}
                  >
                    −
                  </button>

                  <span className="mx-3">{item.quantity}</span>

                  <button
                    className="btn btn-light border me-5"
                    onClick={() => increase(item._id)}
                  >
                    +
                  </button>
                </div>

                <div className="ms-4 fw-bold w-25 cart-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="btn btn-sm btn-dark ms-3"
                  onClick={() => removeItem(item._id)}
                >
                  ✕
                </button>

              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="col-md-4">
            <div className="border p-4">

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Grand Total:</strong>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <button
                className="btn btn-dark w-100"
                onClick={() => {
                  alert("Proceeding to checkout...");
                removeCart()
                 
                  navigate("/checkout")
                }}
              >
                CHECK OUT
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
