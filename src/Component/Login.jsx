import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Login.css";

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert("please Fill Email and Password !");
      return;
    }

    try {
      const res = await axios.post("https://mern-backend-j99c.onrender.com/login", form);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful! 🎉");

        if (res.data.user && res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid Email or Password!");
    }
  };

  return (
    <div className="container py-5 login-container">
      <p className="breadcrumb">HOME / LOGIN</p>
      <h2 className="title">Sign in</h2>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="login-box">
            <label>Email Address:</label>
            <input type="email" name="email" onChange={handleChange} />

            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} />

            <div className="login-actions">
              <button onClick={handleSubmit}>SIGN IN</button>
              <Link to="/forgot">Forgot your password?</Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="new-customer-box">
            <h5>New Customer?</h5>
            <p>Create an account with us and you'll be able to:</p>

            <ul>
              <li>Check out faster</li>
              <li>Save multiple shipping addresses</li>
              <li>Access your order history</li>
              <li>Track new orders</li>
              <li>Save items to your Wish List</li>
            </ul>

            <Link to="/register" className="text-decoration-none">
              <button className="create-btn">CREATE ACCOUNT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
