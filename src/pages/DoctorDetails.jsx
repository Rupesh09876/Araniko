import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building, Loader2 } from "lucide-react";
import { doctorService } from "../services/api";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5001";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    doctorService.getById(id)
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="page-container center" style={{ minHeight: "60vh" }}>
        <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} color="var(--brand)" />
        <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading doctor profile...</p>
      </div>
    );
  }

  if (notFound || !doctor) {
    return (
      <div className="page-container center" style={{ minHeight: "60vh" }}>
        <h2>Doctor not found</h2>
        <p>The doctor you are looking for does not exist or has been removed.</p>
        <Link to="/doctors" className="btn" style={{ marginTop: "20px" }}>
          Back to All Doctors
        </Link>
      </div>
    );
  }

  const imgSrc = doctor.image
    ? (doctor.image.startsWith("http") ? doctor.image : `${BACKEND_URL}${doctor.image}`)
    : null;

  return (
    <div className="page-container doc-details-page">
      <div className="wrap">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="doc-details-layout">
          <div className="doc-image-col">
            {imgSrc ? (
              <img src={imgSrc} alt={doctor.name} className="doc-details-img" />
            ) : (
              <div
                className="doc-details-img"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--brand-light)", color: "var(--brand)", fontSize: "64px", fontWeight: "700" }}
              >
                {doctor.name.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="doc-info-col">
            <h1 className="doc-name-large">{doctor.name}</h1>
            <h2 className="doc-spec-large">{doctor.specialization}</h2>

            <div className="doc-meta">
              {doctor.department && (
                <div className="meta-item">
                  <Building size={18} /> {doctor.department.name}
                </div>
              )}
              {doctor.qualification && (
                <div className="meta-item">
                  🎓 {doctor.qualification}
                </div>
              )}
              {doctor.experience && (
                <div className="meta-item">
                  ⏱ {doctor.experience}
                </div>
              )}
            </div>

            {doctor.bio && (
              <div className="doc-bio">
                <h3>About</h3>
                <p>{doctor.bio}</p>
              </div>
            )}

            <div className="doc-actions">
              <a href="/#contact" className="btn">Book Appointment</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
