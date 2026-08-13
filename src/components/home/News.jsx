import { ArrowRight, Megaphone } from "lucide-react";

export default function News() {
  return (
    <section id="news" className="on-white">
      <div className="wrap">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">News &amp; Updates</span>
            <h2>Hospital Announcements</h2>
          </div>
          <a
            href="https://www.facebook.com/Araniko-Hospital-1407067626207987"
            target="_blank"
            rel="noopener noreferrer"
            className="section-link"
          >
            View All Updates
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>

        <div className="news-empty" role="status">
          <Megaphone size={32} strokeWidth={1.5} color="#0B5CAB" style={{ margin: "0 auto" }} />
          <h3>New updates coming soon</h3>
          <p>
            We&apos;ll post health camps, hospital announcements and awareness
            events here. In the meantime, follow us on Facebook for the latest
            news.
          </p>
        </div>
      </div>
    </section>
  );
}
