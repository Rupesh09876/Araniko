import { ArrowRight } from "lucide-react";
import DynamicIcon from "../common/DynamicIcon";
import { departments } from "../../data/departments";

export default function Departments() {
  return (
    <section id="departments" className="on-white">
      <div className="wrap">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">Specialist Care</span>
            <h2>Our Medical Departments</h2>
          </div>
          <a href="#contact" className="section-link">
            View All Departments
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>

        <div className="grid-3">
          {departments.map((dept) => (
            <div className="dept-card" key={dept.id}>
              <div className="info-icon">
                <DynamicIcon name={dept.iconName} size={20} strokeWidth={2} />
              </div>
              <h3>{dept.title}</h3>
              <p>{dept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
