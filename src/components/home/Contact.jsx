import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import SectionHead from "../common/SectionHead";

const contactRows = [
  {
    icon: <MapPin size={20} strokeWidth={2} />,
    label: "Address",
    value: "Schooldanda, Urlabari-5, Morang, Koshi Province, Nepal",
  },
  {
    icon: <Phone size={20} strokeWidth={2} />,
    label: "Phone",
    value: "021-543981 · 981-9094810 · 974-6881081",
  },
  {
    icon: <Mail size={20} strokeWidth={2} />,
    label: "Email",
    value: "aranikohospital@gmail.com",
  },
  {
    icon: <Clock size={20} strokeWidth={2} />,
    label: "Hours",
    value: "Open 24 hours, including emergency services",
  },
];

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.505552365234!2d87.62971851789129!3d26.664309231547318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e58eb96f8e6b93%3A0x989a8e99f14d9bca!2sAraniko%20Hospital!5e0!3m2!1sen!2snp!4v1736444102212!5m2!1sen!2snp";

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <SectionHead eyebrow="Visit Us" heading="Find Araniko Hospital" />

        <div className="contact-grid">
          {/* Contact info card */}
          <div className="contact-card">
            {contactRows.map((row) => (
              <div className="contact-row" key={row.label}>
                <div className="contact-row-icon" aria-hidden="true">
                  {row.icon}
                </div>
                <div>
                  <h4>{row.label}</h4>
                  <p>{row.value}</p>
                </div>
              </div>
            ))}

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Araniko+Hospital+Urlabari+Morang"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ alignSelf: "flex-start" }}
              aria-label="Get directions to Araniko Hospital"
            >
              <Navigation size={16} strokeWidth={2} />
              Get Directions
            </a>
          </div>

          {/* Map */}
          <div className="map-box">
            <iframe
              src={MAP_EMBED}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing Araniko Hospital location in Urlabari, Morang"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
