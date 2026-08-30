import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, Loader2, UserX } from "lucide-react";
import SectionHead from "../components/common/SectionHead";
import { doctorService } from "../services/api";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5001";

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

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

  const departments = useMemo(() => {
    const deptNames = doctors
      .filter((d) => d.department)
      .map((d) => d.department.name);
    return ["All", ...new Set(deptNames)];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    if (selectedDepartment === "All") return doctors;
    return doctors.filter((d) => d.department?.name === selectedDepartment);
  }, [doctors, selectedDepartment]);

  return (
    <div className="page-container" style={{ padding: "40px 0", minHeight: "80vh" }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Our Team"
          heading="All Medical Professionals"
          description="Find the right specialist for your healthcare needs."
        />

        {loading && (
          <div className="center" style={{ padding: "40px" }}>
            <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} color="var(--brand)" />
            <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading our team of doctors...</p>
          </div>
        )}

        {!loading && error && (
          <div className="center" style={{ padding: "40px" }}>
            <p style={{ color: "var(--ink-soft)" }}>Unable to load doctors at this time. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="all-doctors-layout">
            {/* Mobile Filter Toggle */}
            <button
              className="btn btn-outline mobile-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} /> Filters
            </button>

            {/* Sidebar Filters */}
            <aside className={`doctors-filters ${showFilters ? "show" : ""}`}>
              <div className="filter-group">
                <h3>Department</h3>
                <div className="filter-options">
                  {departments.map((dept) => (
                    <label key={dept} className="filter-label">
                      <input
                        type="radio"
                        name="department"
                        value={dept}
                        checked={selectedDepartment === dept}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                      />
                      {dept}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Grid */}
            <div className="doctors-main-grid">
              {filteredDoctors.length > 0 ? (
                <div className="doc-grid">
                  {filteredDoctors.map((doctor) => {
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
                            View Profile <ArrowRight size={14} strokeWidth={2} />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="no-results">
                  <UserX size={40} strokeWidth={1.5} />
                  <h3>No doctors found matching your criteria.</h3>
                  <button className="btn" onClick={() => setSelectedDepartment("All")}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
