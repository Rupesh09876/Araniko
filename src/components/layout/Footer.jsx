import { MapPin, Phone, Mail, Plus } from "lucide-react";
import FacebookIcon from "../common/FacebookIcon";

const quickLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#departments", label: "Departments" },
  { href: "/#doctors", label: "Doctors" },
  { href: "/#contact", label: "Contact" },
];

const patientLinks = [
  { href: "/#appointment", label: "Appointments" },
  { href: "/#facilities", label: "Patient Information" },
  { href: "/#contact", label: "Visiting Information" },
  { href: "tel:021543981", label: "Emergency" },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        {/* Brand column */}
        <div>
          <div className="footer-brand">
            <div className="footer-badge" aria-hidden="true">
              <Plus size={20} strokeWidth={2.5} color="#fff" />
            </div>
            <span className="footer-brand-name">Araniko Hospital</span>
          </div>
          <p className="desc">
            Compassionate, trusted healthcare for the communities of Urlabari
            and Morang, open 24 hours a day.
          </p>
          <a
            href="https://www.facebook.com/Araniko-Hospital-1407067626207987"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
            aria-label="Araniko Hospital on Facebook"
          >
            <FacebookIcon size={14} strokeWidth={2} />
            Facebook
          </a>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient resources */}
        <div className="footer-col">
          <h5>Patient Resources</h5>
          <ul>
            {patientLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li>
              <MapPin size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
              Schooldanda, Urlabari-5, Morang
            </li>
            <li>
              <Phone size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
              021-543981
            </li>
            <li>
              <Mail size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
              aranikohospital@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Araniko Hospital. All Rights Reserved.</span>
        <div className="links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}
