import React, { useEffect, useState } from "react";
import "../CSS/Slider.css";

const slides = [
  {
    image: "https://cdn11.bigcommerce.com/s-apwcvcac2o/images/stencil/original/carousel/14/slide01__85753.jpg?c=2",
    title: "LAPARIS BIGCOMMERCE THEME",
    desc: "Duis venenatis in urna auctor vestibulum.",
  },
  {
    image: "https://cdn11.bigcommerce.com/s-apwcvcac2o/images/stencil/original/carousel/15/slide02__91142.jpg?c=2",
    title: "TRENDING IN 2017",
    desc: "Praesent quis felis id dui ultricies tempus.",
  },
  {
    image: "https://cdn11.bigcommerce.com/s-apwcvcac2o/images/stencil/original/carousel/16/slide03__96898.jpg?c=2",
    title: "TIME TO SHINE",
    desc: "Best fashion collection for you.",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={i === index ? "slide active" : "slide"}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay-box">
            <h1>{slide.title}</h1>
            <p>{slide.desc}</p>
            <button>VIEW CATEGORY</button>
          </div>
        </div>
      ))}

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;


// import womanImg from "../assets/woman.jpg";
// import manImg from "../assets/man.jpg";
// import summerImg from "../assets/img.jpg";