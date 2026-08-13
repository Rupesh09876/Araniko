import { Phone, Mail, MapPin, Clock } from "lucide-react";
import FacebookIcon from "../common/FacebookIcon";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="topbar-left">
          <a className="topbar-item" href="tel:021543981" aria-label="Call Araniko Hospital">
            <Phone size={14} strokeWidth={2} />
            021-543981
          </a>
          <a className="topbar-item" href="mailto:aranikohospital@gmail.com" aria-label="Email Araniko Hospital">
            <Mail size={14} strokeWidth={2} />
            aranikohospital@gmail.com
          </a>
          <span className="topbar-item">
            <MapPin size={14} strokeWidth={2} />
            Schooldanda, Urlabari-5, Morang
          </span>
        </div>

        <div className="topbar-right">
          <span className="topbar-open">
            <Clock size={14} strokeWidth={2} />
            Open 24 Hours
          </span>
          <a
            href="https://www.facebook.com/Araniko-Hospital-1407067626207987"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Araniko Hospital on Facebook"
            className="topbar-social"
          >
            <FacebookIcon size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  );
}
