import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, UserX } from "lucide-react";
import SectionHead from "../common/SectionHead";
import { doctorService } from "../../services/api";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5001";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    doctorService.getAll()
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section id="doctors">
      <div className="wrap">
        <SectionHead
          eyebrow="Our Team"
          heading="Meet Our Medical Professionals"
          description="A dedicated team of experienced doctors across key specialties, supported by skilled nursing staff."
        />

        {loading && (
          <div className="center" style={{ padding: "40px" }}>
            <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} color="var(--brand)" />
          </div>
        )}

        {!loading && error && (
          <div className="center" style={{ padding: "40px" }}>
            <p style={{ color: "var(--ink-soft)" }}>Unable to load doctors at this time.</p>
          </div>
        )}

        {!loading && !error && doctors.length === 0 && (
          <div className="center" style={{ padding: "40px" }}>
            <UserX size={40} strokeWidth={1.5} color="var(--ink-soft)" />
            <p style={{ color: "var(--ink-soft)", marginTop: "12px" }}>No doctors available at the moment.</p>
          </div>
        )}

        {!loading && !error && doctors.length > 0 && (
          <>
            <div className="doc-grid">
              {doctors.slice(0, 4).map((doctor) => {
                const imgSrc = doctor.image
                  ? (doctor.image.startsWith("http") ? doctor.image : `${BACKEND_URL}${doctor.image}`)
                  : null;

                return (
                  <Link to={`/doctors/${doctor.id}`} className="doc-card" key={doctor.id}>
                    <div className="doc-image-wrapper">
                      {imgSrc ? (
                        <img src={imgSrc} alt={doctor.name} />
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "var(--brand-light)", color: "var(--brand)", fontSize: "32px", fontWeight: "700" }}>
                          {doctor.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="doc-body">
                      <h3 className="doc-name">{doctor.name}</h3>
                      <div className="doc-meta-inline">
                        <span className="doc-spec">{doctor.specialization}</span>
                        {doctor.department && (
                          <>
                            <span className="doc-separator">|</span>
                            <span className="doc-dept">{doctor.department.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="doc-footer">
                      <span className="view-profile-text">
                        View Profile <ArrowRight size={15} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="center">
              <Link to="/doctors" className="btn btn-outline">
                View All Doctors
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
