import { Stethoscope, TriangleAlert } from "lucide-react";

import ABOUT_IMAGE from "../../assets/images/AdoutUs.jpeg";

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
  return (
    <section id="about" className="on-white">
      <div className="wrap about-grid">
        {/* Image side */}
        <div className="about-media">
          <div className="about-img">
            <img
              src={ABOUT_IMAGE}
              alt="Interior of Araniko Hospital medical facility"
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

          {/* Chairman */}
          <div className="chairman">
            <div className="chairman-badge" aria-hidden="true">RL</div>
            <div>
              <div className="chairman-name">Raj Kumar Pomoo Limbu</div>
              <div className="chairman-role">Chairman, Araniko Hospital</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
