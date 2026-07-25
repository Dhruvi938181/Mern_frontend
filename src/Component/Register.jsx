import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    country: "India",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    company: "",
    city: "",
    state: "Gujarat",
    zip: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill in Email and Password!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    try {
      const response = await axios.post("https://mern-backend-j99c.onrender.com/signup", form);

      alert(response.data?.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);

      const errorMessage = err.response?.data?.message || err.response?.data || "Signup failed! Server error occurred.";

      alert(typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage));
    }
  };

  return (
    <div className="register-container py-5">
      <p className="breadcrumb">HOME / CREATE ACCOUNT</p>
      <h2 className="title text-center mb-5">New Account</h2>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <label>Email Address *</label>
          <input type="email" name="email" value={form.email} className="form-control" onChange={handleChange} required />
        </div>

        <div className="col-12 col-md-6">
          <label>Password *</label>
          <input type="password" name="password" value={form.password} className="form-control" onChange={handleChange} required />
        </div>

        <div className="col-12 col-md-6">
          <label>Confirm Password *</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} className="form-control" onChange={handleChange} required />
        </div>

        <div className="col-12 col-md-6">
          <label>Country *</label>
          <select name="country" value={form.country} className="form-select" onChange={handleChange}>
            <option value="United States">United States</option>
            <option value="India">India</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label>First Name *</label>
          <input type="text" name="firstName" value={form.firstName} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-12 col-md-6">
          <label>Last Name *</label>
          <input type="text" name="lastName" value={form.lastName} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-12 col-md-6">
          <label>Address Line 1 *</label>
          <input type="text" name="address1" value={form.address1} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-12 col-md-6">
          <label>Address Line 2</label>
          <input type="text" name="address2" value={form.address2} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-12 col-md-6">
          <label>Company Name</label>
          <input type="text" name="company" value={form.company} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-12 col-md-6">
          <label>Suburb / City *</label>
          <input type="text" name="city" value={form.city} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-12 col-md-6">
          <label>State / Province *</label>
          <select name="state" value={form.state} className="form-select" onChange={handleChange}>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label>Zip / Postcode *</label>
          <input type="text" name="zip" value={form.zip} className="form-control" onChange={handleChange} />
        </div>

        <div className="col-12 col-md-6">
          <label>Phone Number *</label>
          <input type="text" name="phone" value={form.phone} className="form-control" onChange={handleChange} />
        </div>
      </div>

      <div className="text-center mt-5">
        <button className="btn btn-dark px-5" onClick={handleSubmit}>
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Register;
