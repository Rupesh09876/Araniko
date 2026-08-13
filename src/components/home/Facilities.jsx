import SectionHead from "../common/SectionHead";
import { facilities } from "../../data/facilities";

export default function Facilities() {
  return (
    <section id="facilities" className="on-white">
      <div className="wrap">
        <SectionHead
          eyebrow="Our Facilities"
          heading="Built to Support Every Stage of Care"
        />

        <div className="fac-grid">
          {facilities.map((fac) => (
            <div className="fac-card" key={fac.id}>
              <img
                src={fac.imageUrl}
                alt={fac.alt}
                loading="lazy"
              />
              <div className="fac-overlay" aria-hidden="true" />
              <div className="fac-label">{fac.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
