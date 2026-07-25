import { useEffect, useState } from "react";
import axios from "axios";

export default function Collection() {
  const [products, setProducts] = useState([]);

  // 🔹 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // refresh after delete
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      {/* <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Our Collection
      </h2> */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />

            <h4 style={{ margin: "10px 0" }}>{item.title}</h4>
            <p style={{ fontWeight: "bold" }}>₹ {item.price}</p>
            <p style={{ color: "gray" }}>{item.category}</p>

            <button
              onClick={() => deleteProduct(item._id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}