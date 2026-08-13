/**
 * SectionHead — reusable eyebrow label + heading + optional description.
 */
export default function SectionHead({ eyebrow, heading, description, centered = false }) {
  return (
    <div className="section-head" style={centered ? { textAlign: "center", maxWidth: "none" } : {}}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{heading}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
