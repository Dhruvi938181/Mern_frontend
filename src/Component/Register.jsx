import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

const Register = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:7800/signup", form);
    alert("Signup successful");
    navigate("/");
  };

  return (
  <div className="register-container py-5">

    <p className="breadcrumb">HOME / CREATE ACCOUNT</p>
    <h2 className="title text-center mb-5">New Account</h2>

    <div className="row g-4">

      <div className="col-12 col-md-6">
        <label>Email Address *</label>
        <input type="email" name="email" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Password *</label>
        <input type="password" name="password" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Confirm Password *</label>
        <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Country *</label>
        <select name="country" className="form-select" onChange={handleChange}>
          <option>United States</option>
          <option>India</option>
        </select>
      </div>

      <div className="col-12 col-md-6">
        <label>First Name *</label>
        <input type="text" name="firstName" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Last Name *</label>
        <input type="text" name="lastName" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Address Line 1 *</label>
        <input type="text" name="address1" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Address Line 2</label>
        <input type="text" name="address2" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Company Name</label>
        <input type="text" name="company" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Suburb / City *</label>
        <input type="text" name="city" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>State / Province *</label>
        <select name="state" className="form-select" onChange={handleChange}>
          <option>Choose a State</option>
          <option>Gujarat</option>
          <option>Maharashtra</option>
        </select>
      </div>

      <div className="col-12 col-md-6">
        <label>Zip / Postcode *</label>
        <input type="text" name="zip" className="form-control" onChange={handleChange} />
      </div>

      <div className="col-12 col-md-6">
        <label>Phone Number *</label>
        <input type="text" name="phone" className="form-control" onChange={handleChange} />
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
