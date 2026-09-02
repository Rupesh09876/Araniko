import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Calendar, Loader2 } from "lucide-react";
import { newsService } from "../../services/api";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5001";

export default function News() {
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
    <section id="news" className="on-white">
      <div className="wrap">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">News &amp; Updates</span>
            <h2>Hospital Announcements</h2>
          </div>
          <Link
            to="/news"
            className="section-link"
          >
            View All Updates
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>

        {loading && (
          <div className="news-empty" role="status">
            <Loader2 size={32} strokeWidth={1.5} color="#0B5CAB" style={{ margin: "0 auto", animation: "spin 1s linear infinite" }} />
            <h3>Loading announcements...</h3>
          </div>
        )}

        {!loading && error && (
          <div className="news-empty" role="alert">
            <Megaphone size={32} strokeWidth={1.5} color="#D92D20" style={{ margin: "0 auto" }} />
            <h3>Could not load announcements</h3>
            <p>Please check back later or follow us on Facebook for the latest news.</p>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="news-empty" role="status">
            <Megaphone size={32} strokeWidth={1.5} color="#0B5CAB" style={{ margin: "0 auto" }} />
            <h3>New updates coming soon</h3>
            <p>
              We&apos;ll post health camps, hospital announcements and awareness
              events here. In the meantime, follow us on Facebook for the latest
              news.
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="news-grid">
            {news.slice(0, 6).map((item) => {
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
                      {item.content.length > 120
                        ? item.content.substring(0, 120) + "..."
                        : item.content}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
