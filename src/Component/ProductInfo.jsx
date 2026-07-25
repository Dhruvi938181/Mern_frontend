import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/ProductInfo.css";
const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7800/api/products`)
      .then((res) => {
        const single = res.data.find((p) => p._id === id);
        setProduct(single);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h3>Loading...</h3>;
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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "720px", objectFit: "cover" }} />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>
          <div className="d-flex">
            <h5 className="text-danger">₹{product.price}</h5>

            <h5 className="ms-3"> {product.oldPrice && <div className="text-muted text-decoration-line-through">₹{product.oldPrice}</div>}</h5>
          </div>

          <div className="mt-2">{"⭐".repeat(product.rating)}</div>
          <p className="fork-sku">
            <strong>SKU:</strong> {product._id}
          </p>

          <div className="mt-3">
            <strong>Colors:</strong>
            <div className="d-flex mt-2">
              {product.colors?.map((c, i) => (
                <span
                  key={i}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: c,
                    marginRight: "10px",
                    border: "1px solid #ddd",
                  }}></span>
              ))}
            </div>
          </div>
          <hr />
          <h4 className="mt-1">Description:</h4>
          <span>{product.description}</span>

          <div className="fork-quantity">
            <label>QUANTITY:</label>

            <div className="fork-qty-box">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>−</button>

              <input type="text" value={quantity} readOnly />

              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button
            className="btn btn-dark mt-4"
            onClick={() => {
              handleAddToCart();

              setShowModal(true);
            }}>
            Add to Cart
          </button>

          <button className="btn btn-outline-dark mt-4 ms-3">Add to Wishlist</button>
        </div>
      </div>
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Ok, {quantity} item(s) were added to your cart. What's next?</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <img src={product.image} alt={product.name} className="img-fluid" style={{ height: "350px", objectFit: "cover" }} />
                </div>

                <div className="col-md-6">
                  <h4>{product.name}</h4>
                  <p>
                    {quantity} × ₹{product.price}
                  </p>

                  <hr />

                  <button className="btn btn-dark w-100 mb-3" onClick={() => navigate("/checkout")}>
                    PROCEED TO CHECKOUT
                  </button>

                  <button className="btn btn-outline-dark w-100 mb-2" onClick={() => navigate("/")}>
                    CONTINUE SHOPPING
                  </button>

                  <button
                    className="btn btn-light border w-100"
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
