import { useState, useEffect } from "react";
import heroImage1 from "../../assets/images/aranikoImage.jpeg";
import heroImage2 from "../../assets/images/hero-2.jpg";
import heroImage3 from "../../assets/images/hero-3.jpg";

const images = [heroImage1, heroImage2, heroImage3];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero" style={{ padding: 0, position: 'relative' }}>
      <div className="hero-carousel-container" style={{ width: "100%", height: "85vh", minHeight: "600px", backgroundColor: "#1a1a1a", position: "relative", overflow: "hidden" }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentIndex ? "active" : ""}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <img
              src={img}
              alt={`Hero ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}

        {/* Indicators */}
        <div className="carousel-indicators" style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "10px", zIndex: 10 }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "2px solid white",
                backgroundColor: index === currentIndex ? "white" : "transparent",
                cursor: "pointer",
                padding: 0,
                transition: "background-color 0.3s ease"
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
