import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Calendar, Loader2 } from "lucide-react";
import SectionHead from "../components/common/SectionHead";
import { newsService } from "../services/api";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5001";

export default function AllNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    newsService.getAllPublic()
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container" style={{ padding: "40px 0", minHeight: "80vh" }}>
      <div className="wrap">
        <SectionHead
          eyebrow="News & Updates"
          heading="Hospital Announcements"
          description="Stay informed with our latest news, health camps, and hospital updates."
        />

        {loading && (
          <div className="center" style={{ padding: "40px" }}>
            <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} color="var(--brand)" />
            <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading announcements...</p>
          </div>
        )}

        {!loading && error && (
          <div className="center" style={{ padding: "40px" }}>
            <p style={{ color: "var(--ink-soft)" }}>Unable to load announcements at this time. Please try again later.</p>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="no-results" style={{ marginTop: "40px" }}>
            <Megaphone size={40} strokeWidth={1.5} />
            <h3>New updates coming soon</h3>
            <p>
              We'll post health camps, hospital announcements and awareness events here.
              In the meantime, follow us on Facebook for the latest news.
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="news-grid">
            {news.map((item) => {
              const imgSrc = item.image
                ? (item.image.startsWith("http") ? item.image : `${BACKEND_URL}${item.image}`)
                : null;

              return (
                <Link to={`/news/${item.id}`} className="news-card" key={item.id} style={{ display: "block" }}>
                  {imgSrc && (
                    <div className="news-card-img-wrapper">
                      <img src={imgSrc} alt={item.title} className="news-card-img" />
                    </div>
                  )}
                  <div className="news-card-body">
                    <div className="news-card-date">
                      <Calendar size={13} strokeWidth={2} />
                      {new Date(item.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-excerpt">
                      {item.content.length > 150
                        ? item.content.substring(0, 150) + "..."
                        : item.content}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
