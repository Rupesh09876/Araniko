import {
  CalendarDays,
  ArrowRight,
  Phone,
  Clock,
  ShieldCheck,
  Users,
  Layers,
} from "lucide-react";

// Hero section image — replace with real hospital photo:
// import heroImage from "../../assets/images/hero/hero-hospital.jpg";
// Then replace the src below with: src={heroImage}
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop";

const trustItems = [
  { icon: <Phone size={20} strokeWidth={2} color="#D92D20" />, label: "Emergency Services" },
  { icon: <Users size={20} strokeWidth={2} color="#0B5CAB" />, label: "Qualified Doctors" },
  { icon: <Clock size={20} strokeWidth={2} color="#0F8B8D" />, label: "Open 24 Hours" },
  { icon: <ShieldCheck size={20} strokeWidth={2} color="#19A974" />, label: "13+ Years of Service" },
];

export default function Hero() {
  return (
    <section id="home" className="hero" style={{ padding: 0 }}>
      <div className="wrap">
        {/* Copy side */}
        <div className="hero-copy">
          <span className="eyebrow">
            <Layers size={14} strokeWidth={2} />
            Araniko Hospital
          </span>
          <h1>
            Compassionate Care.<br />
            <span>Trusted Healthcare.</span>
          </h1>
          <p>
            For more than 13 years, Araniko Hospital has served the communities
            of Urlabari and Morang with dedicated doctors, skilled nursing staff,
            and round-the-clock emergency care — delivered with compassion and
            professionalism.
          </p>

          <div className="hero-ctas">
            <a href="#appointment" className="btn btn-primary">
              <CalendarDays size={16} strokeWidth={2} />
              Book an Appointment
            </a>
            <a href="#services" className="btn btn-outline">
              Explore Our Services
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>

          {/* Trust grid */}
          <div className="trust-grid">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.label}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Media side */}
        <div className="hero-media">
          <div className="hero-img">
            <img
              src={HERO_IMAGE}
              alt="Doctor consulting with a patient at Araniko Hospital"
            />
          </div>

          {/* Floating stat card */}
          <div className="floating-card">
            <div className="floating-badge" aria-hidden="true">
              <Users size={16} strokeWidth={2} color="#19A974" />
            </div>
            <div>
              <div className="floating-num">2,200+</div>
              <div className="floating-label">Patients cared for last month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
