import React from "react";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import "../CSS/Footer.css";

export default function Footer() {
  return (
    <footer className="laparis-footer mt-5">
      {/* Newsletter */}
      <div className="newsletter">
        <div className="container">
          <div className="row news-inner">
            <div className="col-12 col-sm-6 col-lg-4 pt-2">
              <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 pt-2">
              <p>Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="col-12 col-lg-4 pt-2">
              <div className="subscribe">
                <input type="email" placeholder="Your email address" />
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ marginLeft: "80px", marginTop: "0px", marginRight: "80px" }} />

      {/* Middle Links */}
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-2 mt-2">
              <h5>CUSTOMER SERVICES</h5>
              <p>FAQs</p>
              <p>Size Guide</p>
              <p>Contact Us</p>
              <p>Sell With Us</p>
              <p>Sitemap</p>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-2 mt-2">
              <h5>DELIVERY & RETURNS</h5>
              <p>Delivery</p>
              <p>Order Tracking</p>
              <p>Returns</p>
              <p>E-Receipts</p>
              <p>Buying Guides</p>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-2 mt-2">
              <h5>CARDS & DISCOUNTS</h5>
              <p>Gift Cards</p>
              <p>Store Cards</p>
              <p>Buy Gift Cards</p>
              <p>Sale Cards</p>
            </div>

            <div className="col-sm-6 col col-lg-2 mt-2">
              <h5>CONNECT WITH US</h5>
              <div className="icons">
                <FaTwitter />
                <FaFacebookF />
                <FaYoutube />
                <FaInstagram />
                <FaPinterestP />
                <FaLinkedinIn />
              </div>
            </div>

            <div className="col-12 col-sm-6 col col-lg-4 d-flex mt-2">
              <h5>PAYMENT METHODS</h5>
              <div className="pay">
                <i class="fab fa-cc-paypal fs-1 "></i>
                <i class="fab fa-cc-visa fs-1 ms-2"></i>
                <i class="fab fa-cc-discover fs-1 ms-2"></i>
                <i class="fab fa-cc-amex fs-1 ms-2"></i>
                <i class="fab fa-google-pay fs-1 ms-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ marginLeft: "80px", marginTop: "0px", marginRight: "80px" }} />

    <div className="footer-bottom py-4">
  <div className="container">
    <div className="row align-items-center text-center text-md-start">

      {/* Brand */}
      <div className="col-12 col-md-3 mb-3 mb-md-0 brand">
        <h2 className="mb-0">LAPARIS</h2>
        <span>FASHION STORE</span>
      </div>

      {/* Links */}
      <div className="col-12 col-md-6 mb-3 mb-md-0">
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 links">
          <span>ABOUT US</span>
          <span>TERMS OF USE</span>
          <span>PRIVACY POLICY</span>
          <span>STORE LOCATION</span>
          <span>SITEMAP</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="col-12 col-md-3 text-md-end copy">
        © 2026 LAPARIS.
      </div>

    </div>
  </div>
</div>

    </footer>
  );
}
