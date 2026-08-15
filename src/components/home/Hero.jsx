import heroImage from "../../assets/images/aranikoImage.jpeg";

export default function Hero() {
  return (
    <section id="home" className="hero" style={{ padding: 0 }}>
      <div className="hero-image-placeholder" style={{ width: "100%", height: "85vh", minHeight: "600px", backgroundColor: "#e2e8f0" }}>
        <img
          src={heroImage}
          alt="Hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </section>
  );
}
