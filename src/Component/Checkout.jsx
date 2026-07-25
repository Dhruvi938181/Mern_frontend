import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = () => {
    if (!formData.name || !formData.address) {
      alert("Please fill all required fields");
      return;
    }

    alert("Order Placed Successfully 🎉");

    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-5 text-center">Checkout</h2>

      <div className="row">
        <div className="col-md-7">
          <h5 className="mb-3">Shipping Details</h5>

          <input type="text" name="name" placeholder="Full Name" className="form-control mb-3" onChange={handleChange} />

          <input type="email" name="email" placeholder="Email" className="form-control mb-3" onChange={handleChange} />

          <textarea name="address" placeholder="Address" className="form-control mb-3" onChange={handleChange} />

          <div className="row">
            <div className="col">
              <input type="text" name="city" placeholder="City" className="form-control mb-3" onChange={handleChange} />
            </div>

            <div className="col">
              <input type="text" name="pincode" placeholder="Pincode" className="form-control mb-3" onChange={handleChange} />
            </div>
          </div>

          <h6 className="mt-3">Payment Method</h6>

          <select name="payment" className="form-control mb-4" onChange={handleChange}>
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div className="col-md-5">
          <div className="border p-4">
            <h5 className="mb-3">Order Summary</h5>

            {cartItems.map((item) => (
              <div key={item._id} className="d-flex justify-content-between mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between mb-3">
              <strong>Subtotal:</strong>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <strong>Total:</strong>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>

            <button className="btn btn-dark w-100" onClick={placeOrder}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
