import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    axios
      .get("http://localhost:7800/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);


  const handleAddToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(
    (item) => item._id === selectedProduct._id
  );

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

  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div class="section-title">
        <span>NEW PRODUCTS</span>
      </div>
      <div className="text-center mb-5">
        <button onClick={() => setFilter("ALL")} className="me-3">
          All
        </button>
        <button onClick={() => setFilter("HOT")} className="me-3">
          Hot
        </button>
        <button onClick={() => setFilter("NEW")} className="me-3">
          New
        </button>
        <button onClick={() => setFilter("SALE")} className="me-3">
          Sale
        </button>
      </div>

      <div className="row">
        {products
          .filter((item) => {
            if (filter === "ALL") return true;
            return item.badge?.toUpperCase() === filter;
          })
          .map((item) => (
            <div className="col-md-3 mb-4" key={item._id}>
              <div className="card product-card h-100 w-100" style={{ border: "none" }}>
                {item.badge && <span className="badge bg-danger position-absolute">{item.badge}</span>}

                <div className="image-wrapper">
                  <img src={item.image} alt={item.name} className="product-img" onClick={() => navigate(`/product/${item._id}`)} style={{ cursor: "pointer" }} />

                  {/* Right Side Icons */}
                  <div className="product-icons"> 
                    <i class="fas fa-cart-arrow-down" onClick={()=>{navigate("/cart")
                    }}></i>
                    <i class="far fa-heart"></i>
                  </div>

                  {/* Quick View Button */}
                  <button className="quick-view-btn" onClick={() => {setSelectedProduct(item)
                     setQuantity(1);
                  }}>
                    QUICK VIEW
                  </button>
                </div>

                <div className="card-body">
                  <h5>{item.name}</h5>
                  <div className="d-flex justify-content-between">
                    <div>
                      {" "}
                      <span className="text-danger fw-bold">₹{item.price}</span> {item.oldPrice && <span className="text-muted text-decoration-line-through">₹{item.oldPrice}</span>}
                    </div>
                    <div className="d-flex ">
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
                          }}></span>
                      ))}
                    </div>
                  </div>
                 
                  <div className="mt-1 ms-0">{"⭐".repeat(item.rating)}</div>
                </div>
              </div>
            </div>
          ))}
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

                <p className="fork-price">₹{selectedProduct.price}</p>

                <div className="mt-1 ms-0">{"⭐".repeat(selectedProduct.rating)}</div>

                <p className="fork-sku">
                  <strong>SKU:</strong> {selectedProduct._id}
                </p>

                <hr />

                <p className="fork-description">{selectedProduct.description}</p>

                <div className="fork-quantity">
                  <label>QUANTITY:</label>
                  <div className="qty-box">
                    <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <div className="fork-buttons">
                  <button className="fork-cart" onClick={handleAddToCart}>ADD TO CART</button>
                  <button className="fork-wish">ADD TO WISH LIST</button>
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
