import React from "react";
import "../CSS/Banner.css";

import woman from "../assets/woman.jpg";
import man from "../assets/man.jpg";
import leaves from "../assets/img.jpg";

export default function BannerGrid() {
  return (
    <div className="wrap">
      <div className="top d-flex align-items-center ">
        <div className="card woman ">
          <h2>
            The Woman <br />
            <span>Collection</span>
          </h2>
          <p>Mauris at bibendum ex, sit amet ornare quam. Aenean interdum lectus sagittis turpis sit amet neque varius.</p>
          <button>VIEW CATEGORIES</button>
        </div>

        <div className="img  girl">
          <img src={woman} alt="" />
        </div>
      </div>

      <div className="bottom">
        <div className="card summer" style={{ backgroundImage: `url(${leaves})` }}>
          <div className="center">
            <h3>
              Hello <span>Summer</span>
            </h3>
            <p>HOT DISCOUNTS OF THIS WEEKEND</p>
            <button>LOOKBOOK</button>
          </div>
        </div>

        <div className="img-box">
          <img src={man} alt="" />
        </div>

        <div className="card style" style={{ border: "none" }}>
          <h3 style={{ fontStyle: "italic", fontSize: "40px", width: "190px", textAlign: "center" }}>The Main Style</h3>
          <button style={{ border: "none", width: "180px", fontSize: "18px" }}>VIEW COLLECTION</button>
        </div>
      </div>
    </div>
  );
}
