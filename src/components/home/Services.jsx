import DynamicIcon from "../common/DynamicIcon";
import SectionHead from "../common/SectionHead";
import { services } from "../../data/services";

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <SectionHead
          eyebrow="What We Offer"
          heading="Healthcare Services Designed Around You"
          description="Araniko Hospital provides more than 20 key medical services — from routine consultation to emergency response — delivered with quality and compassion."
        />

        <div className="grid-4">
          {services.map((service) => (
            <div className="info-card" key={service.id}>
              <div className={`info-icon ${service.colorClass}`}>
                <DynamicIcon name={service.iconName} size={20} strokeWidth={2} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
