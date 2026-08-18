import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Stethoscope, Building } from "lucide-react";
import { doctors } from "../data/doctors";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const doctor = doctors.find((doc) => doc.id === id);

  if (!doctor) {
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

  return (
    <div className="page-container doc-details-page">
      <div className="wrap">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="doc-details-layout">
          <div className="doc-image-col">
            <img src={doctor.image} alt={doctor.name} className="doc-details-img" />
          </div>
          
          <div className="doc-info-col">
            <h1 className="doc-name-large">{doctor.name}</h1>
            <h2 className="doc-spec-large">{doctor.specialty}</h2>
            
            <div className="doc-meta">
              <div className="meta-item">
                <Building size={18} /> {doctor.department}
              </div>
              <div className="meta-item">
                <Calendar size={18} /> {doctor.availability}
              </div>
            </div>
            
            <div className="doc-bio">
              <h3>About</h3>
              <p>{doctor.bio}</p>
            </div>
            
            <div className="doc-actions">
              <a href="#contact" className="btn">Book Appointment</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
