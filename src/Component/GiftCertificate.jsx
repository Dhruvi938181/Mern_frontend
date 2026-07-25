import { useState } from "react";
import "../CSS/Gift.css";

const GiftCertificate = () => {
  const [form, setForm] = useState({ theme: "Birthday" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert("Gift Certificate Added to Cart");
  };

  return (
    <div className="gift-container">
      <p className="breadcrumb">HOME / GIFT CERTIFICATES</p>
      <h2 className="title">Gift Certificates</h2>

      <div className="gift-grid">
        <div>
          <label>Your Name *</label>
          <input name="yourName" onChange={handleChange} />
        </div>

        <div>
          <label>Your Email *</label>
          <input name="yourEmail" onChange={handleChange} />
        </div>

        <div>
          <label>Recipient's Name *</label>
          <input name="recName" onChange={handleChange} />
        </div>

        <div>
          <label>Recipient's Email *</label>
          <input name="recEmail" onChange={handleChange} />
        </div>

        <div>
          <label>Amount *</label>
          <input name="amount" />
        </div>

        <div>
          <label>Optional Message</label>
          <textarea name="message" onChange={handleChange}></textarea>
        </div>
      </div>
      <div className="theme-box">
        <p className="theme-title">Gift Certificate Theme *</p>

        {["Birthday", "Boy", "Celebration", "Christmas", "General", "Girl"].map((t) => (
          <label key={t}>
            <input type="radio" name="theme" value={t} checked={form.theme === t} onChange={handleChange} /> {t}
          </label>
        ))}
      </div>

      <div className="checkbox-line">
        <input type="checkbox" />
        <span>I agree that Gift Certificates are nonrefundable</span>
      </div>

      <div className="gift-buttons">
        <button className="add" onClick={handleSubmit}>
          ADD GIFT CERTIFICATE TO CART
        </button>
      </div>
    </div>
  );
};

export default GiftCertificate;
