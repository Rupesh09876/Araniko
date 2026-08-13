import { Phone, CalendarDays } from "lucide-react";

export default function MobileBar() {
  return (
    <div className="mobile-bar" role="navigation" aria-label="Mobile quick actions">
      <a
        href="tel:021543981"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px 0",
          color: "var(--emergency)",
          fontWeight: 600,
          fontSize: "14px",
          textDecoration: "none",
        }}
        aria-label="Emergency call 021-543981"
      >
        <Phone size={16} strokeWidth={2} />
        Emergency Call
      </a>
      <div style={{ width: "1px", background: "#E2E8F0" }} aria-hidden="true" />
      <a
        href="#appointment"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px 0",
          color: "var(--brand)",
          fontWeight: 600,
          fontSize: "14px",
          textDecoration: "none",
        }}
        aria-label="Book an appointment"
      >
        <CalendarDays size={16} strokeWidth={2} />
        Appointment
      </a>
    </div>
  );
}
