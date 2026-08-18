import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Filter } from "lucide-react";
import SectionHead from "../components/common/SectionHead";
import { doctors } from "../data/doctors";

export default function AllDoctors() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique departments for filters
  const departments = ["All", ...new Set(doctors.map(doc => doc.department))];
  const availabilityOptions = ["All", "Mon, Wed, Fri", "Tue, Thu, Sat", "Mon to Fri", "On Call"];

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchDept = selectedDepartment === "All" || doc.department === selectedDepartment;
      const matchAvail = selectedAvailability === "All" || doc.availability === selectedAvailability;
      return matchDept && matchAvail;
    });
  }, [selectedDepartment, selectedAvailability]);

  return (
    <div className="page-container" style={{ padding: "40px 0", minHeight: "80vh" }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Our Team"
          heading="All Medical Professionals"
          description="Find the right specialist for your healthcare needs."
        />

        <div className="all-doctors-layout">
          {/* Mobile Filter Toggle */}
          <button 
            className="btn btn-outline mobile-filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} /> Filters
          </button>

          {/* Sidebar Filters */}
          <aside className={`doctors-filters ${showFilters ? 'show' : ''}`}>
            <div className="filter-group">
              <h3>Department</h3>
              <div className="filter-options">
                {departments.map(dept => (
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

            <div className="filter-group">
              <h3>Availability</h3>
              <div className="filter-options">
                {availabilityOptions.map(avail => (
                  <label key={avail} className="filter-label">
                    <input 
                      type="radio" 
                      name="availability"
                      value={avail}
                      checked={selectedAvailability === avail}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                    />
                    {avail}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="doctors-main-grid">
            {filteredDoctors.length > 0 ? (
              <div className="doc-grid">
                {filteredDoctors.map((doctor) => (
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
                        View Profile <ArrowRight size={14} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No doctors found matching your criteria.</h3>
                <button className="btn" onClick={() => { setSelectedDepartment("All"); setSelectedAvailability("All"); }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
