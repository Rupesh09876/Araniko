import { ArrowRight } from "lucide-react";
import DynamicIcon from "../common/DynamicIcon";
import { quickActions } from "../../data/quickActions";

export default function QuickActions() {
  return (
    <section className="quick-actions" style={{ paddingTop: '6rem' }}>
      <div className="wrap">
        <div className="quick-grid">
          {quickActions.map((card) => (
            <a
              key={card.id}
              href={card.href}
              className={`qa-card${card.isEmergency ? " emergency" : ""}`}
            >
              <div className={`qa-icon ${card.colorClass}`}>
                <DynamicIcon name={card.iconName} size={20} strokeWidth={2} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className={`qa-link${card.isEmergency ? " em" : ""}`}>
                {card.linkText}
                <ArrowRight size={14} strokeWidth={2} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
