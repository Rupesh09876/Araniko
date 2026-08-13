import { CheckCircle, MessageCircle, TriangleAlert, GraduationCap, Building2, Users } from "lucide-react";

// Why Choose Us image — replace with real photo:
// import whyImage from "../../assets/images/hospital/hospital-team.jpg";
const WHY_IMAGE =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop";

const whyPoints = [
  {
    icon: <CheckCircle size={20} strokeWidth={2} color="#19A974" />,
    title: "Service & Check",
    description: "Ongoing patient care, monitoring and evaluation.",
  },
  {
    icon: <MessageCircle size={20} strokeWidth={2} color="#19A974" />,
    title: "Medical Advice",
    description: "Trusted guidance for informed health decisions.",
  },
  {
    icon: <TriangleAlert size={20} strokeWidth={2} color="#19A974" />,
    title: "Emergency Help",
    description: "Immediate assistance for urgent situations.",
  },
  {
    icon: <GraduationCap size={20} strokeWidth={2} color="#19A974" />,
    title: "Qualified Doctors",
    description: "Certified professionals delivering expert care.",
  },
  {
    icon: <Building2 size={20} strokeWidth={2} color="#19A974" />,
    title: "Affordable Prices",
    description: "Quality care at reasonable, accessible cost.",
  },
  {
    icon: <Users size={20} strokeWidth={2} color="#19A974" />,
    title: "100+ Team Members",
    description: "A dedicated staff serving Morang district.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why">
      <div className="wrap why-grid">
        {/* Image side */}
        <div className="why-img">
          <img
            src={WHY_IMAGE}
            alt="Medical team at Araniko Hospital"
            loading="lazy"
          />
        </div>

        {/* Content side */}
        <div>
          <span className="eyebrow" style={{ color: "var(--leaf)" }}>
            Why Choose Us
          </span>
          <h2>Excellence, Trust and Compassionate Medical Care</h2>

          <div className="why-points">
            {whyPoints.map((point) => (
              <div className="why-point" key={point.title}>
                {point.icon}
                <div>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
