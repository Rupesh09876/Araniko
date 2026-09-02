import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { newsService } from "../services/api";

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5001";

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    newsService.getById(id)
      .then((data) => {
        setNewsItem(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="page-container center" style={{ minHeight: "60vh" }}>
        <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} color="var(--brand)" />
        <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading announcement...</p>
      </div>
    );
  }

  if (notFound || !newsItem) {
    return (
      <div className="page-container center" style={{ minHeight: "60vh" }}>
        <h2>Announcement not found</h2>
        <p>The news or update you are looking for does not exist or has been removed.</p>
        <Link to="/news" className="btn" style={{ marginTop: "20px" }}>
          Back to All Updates
        </Link>
      </div>
    );
  }

  const imgSrc = newsItem.image
    ? (newsItem.image.startsWith("http") ? newsItem.image : `${BACKEND_URL}${newsItem.image}`)
    : null;

  return (
    <div className="page-container" style={{ padding: "40px 0", minHeight: "80vh" }}>
      <div className="wrap">
        <button className="back-link" onClick={() => navigate(-1)} style={{ marginBottom: "20px", display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", color: "var(--brand)", fontSize: "16px", fontWeight: "500" }}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {imgSrc && (
            <img 
              src={imgSrc} 
              alt={newsItem.title} 
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "var(--radius-md)", marginBottom: "24px" }}
            />
          )}

          <h1 style={{ fontSize: "32px", color: "var(--ink-dark)", marginBottom: "16px", lineHeight: 1.3 }}>
            {newsItem.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ink-soft)", fontSize: "14px", marginBottom: "32px" }}>
            <Calendar size={16} />
            {new Date(newsItem.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div style={{ color: "var(--ink)", lineHeight: 1.8, fontSize: "16px", whiteSpace: "pre-wrap" }}>
            {newsItem.content}
          </div>
        </div>
      </div>
    </div>
  );
}
