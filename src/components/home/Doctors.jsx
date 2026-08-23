import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHead from "../common/SectionHead";
import { doctors } from "../../data/doctors";

export default function Doctors() {
  return (
    <section id="doctors">
      <div className="wrap">
        <SectionHead
          eyebrow="Our Team"
          heading="Meet Our Medical Professionals"
          description="A dedicated team of experienced doctors across key specialties, supported by skilled nursing staff."
        />

        <div className="doc-grid">
          {doctors.map((doctor) => (
            <Link to={`/doctors/${doctor.id}`} className="doc-card" key={doctor.id}>
              <div className="doc-image-wrapper">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                />
              </div>
              <div className="doc-body">
                <h3 className="doc-name">{doctor.name}</h3>
                <div className="doc-meta-inline">
                  <span className="doc-spec">{doctor.specialty}</span>
                  <span className="doc-separator">|</span>
                  <span className="doc-dept">{doctor.department}</span>
                </div>
              </div>
              <div className="doc-footer">
                <span className="view-profile-text">
                  View Profile <ArrowRight size={15} strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="center">
          <Link to="/doctors" className="btn btn-outline">
            View All Doctors
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
