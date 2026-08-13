import { useState } from "react";
import { Phone, ArrowRight, Shield, CheckCircle } from "lucide-react";

const departments = [
  "General Medicine",
  "Orthopedics",
  "Pediatrics",
  "Obstetrics & Gynaecology",
  "General Surgery",
  "ENT",
  "Dermatology",
  "Other",
];

export default function AppointmentCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "General Medicine",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", phone: "", department: "General Medicine", notes: "" });
  };

  return (
    <section id="appointment" className="appointment">
      <div className="wrap appt-grid">
        {/* Copy side */}
        <div className="appt-copy">
          <h2>Your Health Deserves Timely Care</h2>
          <p>
            Connect with our healthcare team and take the next step toward the
            care you need. Our reception will confirm your appointment by phone.
          </p>
          <div className="hero-ctas">
            <a href="tel:021543981" className="btn btn-white">
              <Phone size={16} strokeWidth={2} />
              Call the Hospital
            </a>
          </div>
          <div className="appt-note">
            <Shield size={16} strokeWidth={2} />
            Your information is used only to confirm your appointment.
          </div>
        </div>

        {/* Form */}
        <form className="appt-form" onSubmit={handleSubmit} noValidate>
          <h3>Request an Appointment</h3>

          <div className="field">
            <label htmlFor="appt-name">Full Name</label>
            <input
              id="appt-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="appt-phone">Phone Number</label>
              <input
                id="appt-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="98XXXXXXXX"
              />
            </div>
            <div className="field">
              <label htmlFor="appt-dept">Department</label>
              <select
                id="appt-dept"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="appt-notes">Notes (optional)</label>
            <textarea
              id="appt-notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Briefly describe your concern"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Submit Request
            <ArrowRight size={16} strokeWidth={2} />
          </button>

          {submitted && (
            <div className="form-success visible" role="alert">
              <CheckCircle size={16} strokeWidth={2} />
              Request received. Our team will call you to confirm.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
