import { Stethoscope, TriangleAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { profileService } from "../../services/api";

import ABOUT_IMAGE from "../../assets/images/AdoutUs.jpeg";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5001";

const points = [
  {
    icon: <Stethoscope size={20} strokeWidth={2} color="#0B5CAB" />,
    title: "Doctor Support",
    description: "Expert guidance from qualified doctors, available when needed.",
  },
  {
    icon: <TriangleAlert size={20} strokeWidth={2} color="#D92D20" />,
    title: "Emergency Services",
    description: "Rapid response for timely, critical care.",
  },
];

export default function About() {
  const [profile, setProfile] = useState({
    chairmanName: "Raj Kumar Pomoo Limbu",
    chairmanTitle: "Chairman, Araniko Hospital",
    chairmanImage: null,
  });

  useEffect(() => {
    profileService.get().then((data) => {
      if (data) setProfile(data);
    }).catch(() => {
      // silently fallback to default values if API unavailable
    });
  }, []);

  const initials = profile.chairmanName
    ? profile.chairmanName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "RL";

  const imageUrl = profile.chairmanImage
    ? profile.chairmanImage.startsWith("http")
      ? profile.chairmanImage
      : `${BACKEND_URL}${profile.chairmanImage}`
    : null;

  return (
    <section id="about" className="on-white">
      <div className="wrap about-grid">
        {/* Image side */}
        <div className="about-media">
          <div className="about-img">
            <img
              src={imageUrl || ABOUT_IMAGE}
              alt={profile.chairmanName || "Interior of Araniko Hospital medical facility"}
              loading="lazy"
            />
          </div>
          <div className="about-stat" aria-label="13+ years serving Morang">
            <div className="num">13+</div>
            <div className="lbl">Years serving Morang</div>
          </div>
        </div>

        {/* Copy side */}
        <div className="about-copy">
          <span className="eyebrow">About Araniko Hospital</span>
          <h2>Healthcare with Compassion, Expertise and Trust</h2>
          <p>
            For more than 13 years, Araniko Hospital has been dedicated to
            delivering exceptional healthcare services to communities across
            Urlabari and the wider Morang district. Our team of qualified doctors
            and skilled nursing staff work to ensure every patient receives
            attentive, professional care.
          </p>
          <p>
            We provide medicines, ambulance support, and diagnostic facilities to
            meet a wide range of healthcare needs, with a continued focus on both
            preventive and curative care for every family we serve.
          </p>

          <div className="about-points">
            {points.map((point) => (
              <div className="about-point" key={point.title}>
                {point.icon}
                <div>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chairman — dynamically from backend */}
          <div className="chairman">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={profile.chairmanName}
                className="chairman-badge"
                style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <div className="chairman-badge" aria-hidden="true">{initials}</div>
            )}
            <div>
              <div className="chairman-name">{profile.chairmanName}</div>
              <div className="chairman-role">{profile.chairmanTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
