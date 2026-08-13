import DynamicIcon from "../common/DynamicIcon";
import SectionHead from "../common/SectionHead";
import { patientInfo } from "../../data/patientInfo";

export default function PatientInfo() {
  return (
    <section>
      <div className="wrap">
        <SectionHead
          eyebrow="Patient Information"
          heading="Everything You Need Before Your Visit"
        />

        <div className="grid-3">
          {patientInfo.map((item) => (
            <div className="info-card" key={item.id}>
              <div className="info-icon bg-blue">
                <DynamicIcon name={item.iconName} size={20} strokeWidth={2} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
