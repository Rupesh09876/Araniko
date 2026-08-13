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
            <div className="doc-card" key={doctor.id}>
              <div
                className="doc-avatar"
                style={{ background: doctor.avatarColor }}
                aria-hidden="true"
              >
                {doctor.initials}
              </div>
              <div className="doc-name">{doctor.name}</div>
              <div className="doc-spec">{doctor.specialty}</div>
              <div className="doc-dept">{doctor.department}</div>
              <a href="#contact" className="doc-link">
                View Profile
                <ArrowRight size={14} strokeWidth={2} />
              </a>
            </div>
          ))}
        </div>

        <div className="center">
          <a href="#contact" className="btn btn-outline">
            View All Doctors
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
