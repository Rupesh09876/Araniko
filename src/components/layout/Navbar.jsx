import { useState } from "react";
import { Menu, X, Phone, CalendarDays, Plus } from "lucide-react";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#departments", label: "Departments" },
  { href: "/#doctors", label: "Doctors" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/#news", label: "News" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="wrap nav-row">
        {/* Brand */}
        <a href="/#home" className="brand-mark" onClick={closeMenu}>
          <div className="brand-badge" aria-hidden="true">
            <Plus size={22} strokeWidth={2.5} color="#fff" />
          </div>
          <div>
            <div className="brand-name">Araniko Hospital</div>
            <div className="brand-sub">Urlabari, Morang</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="primary-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA buttons */}
        <div className="nav-cta">
          <a href="tel:021543981" className="btn btn-emergency-outline">
            <Phone size={14} strokeWidth={2} />
            Emergency
          </a>
          <a href="/#appointment" className="btn btn-primary">
            <CalendarDays size={14} strokeWidth={2} />
            Book Appointment
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      <div className={`mobile-nav-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <div className="mobile-nav-cta">
          <a href="tel:021543981" className="btn btn-emergency-outline" onClick={closeMenu}>
            <Phone size={14} strokeWidth={2} />
            Emergency: 021-543981
          </a>
          <a href="/#appointment" className="btn btn-primary" onClick={closeMenu}>
            <CalendarDays size={14} strokeWidth={2} />
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
