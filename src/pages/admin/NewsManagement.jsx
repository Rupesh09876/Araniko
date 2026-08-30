import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2, Calendar } from "lucide-react";
import { newsService } from "../../services/api";
import "../../styles/admin.css";

export default function NewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "") : "http://localhost:5001";

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await newsService.getAllAdmin();
      setNews(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news announcements from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const showToast = (message, isSuccess = true) => {
    if (isSuccess) {
      setSuccess(message);
      setTimeout(() => setSuccess(""), 4000);
    } else {
      setError(message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedNewsId(null);
    setTitle("");
    setContent("");
    // format current date-time for datetime-local input
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setPublishedAt(now.toISOString().slice(0, 16));
    setExpiresAt("");
    setIsActive(true);
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const formatDateTimeForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setSelectedNewsId(item.id);
    setTitle(item.title || "");
    setContent(item.content || "");
    setPublishedAt(formatDateTimeForInput(item.publishedAt));
    setExpiresAt(item.expiresAt ? formatDateTimeForInput(item.expiresAt) : "");
    setIsActive(item.isActive !== undefined ? item.isActive : true);
    setImageFile(null);
    setImagePreview(item.image ? (item.image.startsWith("http") ? item.image : `${backendUrl}${item.image}`) : "");
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id, itemTitle) => {
    if (window.confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
      try {
        await newsService.delete(id);
        showToast("News announcement deleted successfully.");
        fetchNews();
      } catch (err) {
        console.error(err);
        showToast("Failed to delete news item.", false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      showToast("Title and content are required.", false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published_at", publishedAt);
    if (expiresAt) {
      formData.append("expires_at", expiresAt);
    } else {
      formData.append("expires_at", "");
    }
    formData.append("is_active", isActive);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEditing) {
        await newsService.update(selectedNewsId, formData);
        showToast("News announcement updated successfully.");
      } else {
        await newsService.create(formData);
        showToast("New news announcement published successfully.");
      }
      setModalOpen(false);
      fetchNews();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save news announcement details.", false);
    }
  };

  const isExpired = (expiresAtStr) => {
    if (!expiresAtStr) return false;
    return new Date(expiresAtStr) < new Date();
  };

  return (
    <div className="news-management">
      {/* Toast Notifications */}
      <div className="notification-container">
        {success && <div className="toast success">{success}</div>}
        {error && <div className="toast error">{error}</div>}
      </div>

      <div className="section-head-row" style={{ marginBottom: "24px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "24px", color: "var(--ink)" }}>Manage News &amp; Events</h2>
          <p style={{ color: "var(--ink-soft)", margin: "4px 0 0" }}>
            Publish alerts, camps, and notices with automatic expiration filter.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Plus size={16} /> Add Announcement
        </button>
      </div>

      {loading ? (
        <div className="center" style={{ padding: "40px" }}>
          <Loader2 size={32} className="animate-spin" color="var(--brand)" />
          <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading news archive...</p>
        </div>
      ) : (
        <div className="panel-card">
          <div className="panel-header">
            <h2>Announcements List</h2>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title &amp; Date</th>
                  <th>Expiration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlignment: "center", color: "var(--ink-soft)", padding: "32px" }}>
                      No news announcements created.
                    </td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr key={item.id}>
                      <td style={{ maxWidth: "400px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {item.image && (
                            <img
                              src={item.image.startsWith("http") ? item.image : `${backendUrl}${item.image}`}
                              alt={item.title}
                              style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                            />
                          )}
                          <div>
                            <div style={{ fontWeight: "600", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "340px" }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: "12px", color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                              <Calendar size={12} /> {new Date(item.publishedAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.expiresAt ? (
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span>{new Date(item.expiresAt).toLocaleString()}</span>
                            {isExpired(item.expiresAt) && (
                              <span style={{ fontSize: "11px", color: "var(--emergency)", fontWeight: "600", marginTop: "2px" }}>
                                [Expired]
                              </span>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: "var(--ink-soft)" }}>Never Expires</span>
                        )}
                      </td>
                      <td>
                        {item.isActive ? (
                          isExpired(item.expiresAt) ? (
                            <span className="badge warning">Hidden (Expired)</span>
                          ) : (
                            <span className="badge success">Active (Public)</span>
                          )
                        ) : (
                          <span className="badge danger">Inactive (Draft)</span>
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn-icon" onClick={() => handleOpenEdit(item)} title="Edit announcement">
                            <Edit2 size={14} />
                          </button>
                          <button className="btn-icon delete" onClick={() => handleDelete(item.id, item.title)} title="Delete announcement">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit News Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{isEditing ? "Edit News Announcement" : "Create News Announcement"}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "contents" }}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group-full">
                    <label>Announcement Title *</label>
                    <input
                      type="text"
                      className="form-control-input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Free Eye Health Camp 2026"
                      required
                    />
                  </div>

                  <div className="form-group-full">
                    <label>Details / Content *</label>
                    <textarea
                      className="form-control-textarea"
                      rows="6"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Explain the camp or announcement details fully..."
                      required
                    />
                  </div>

                  <div>
                    <label>Publish At *</label>
                    <input
                      type="datetime-local"
                      className="form-control-input"
                      value={publishedAt}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label>Expires At (Optional)</label>
                    <input
                      type="datetime-local"
                      className="form-control-input"
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                    />
                    <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--ink-soft)" }}>
                      News disappears from public page automatically after this time.
                    </p>
                  </div>

                  <div className="form-group-full" style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0" }}>
                    <input
                      type="checkbox"
                      id="isActiveToggle"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    />
                    <label htmlFor="isActiveToggle" style={{ margin: 0, cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
                      Published Status (Check to show publicly)
                    </label>
                  </div>

                  <div className="form-group-full">
                    <label>Banner Image</label>
                    <div className="image-preview-container">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                      ) : (
                        <div className="image-preview-placeholder">
                          <Upload size={20} />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          id="news-image-file"
                          onChange={handleImageChange}
                        />
                        <label
                          htmlFor="news-image-file"
                          className="btn btn-outline"
                          style={{ cursor: "pointer", display: "inline-block", fontSize: "14px", padding: "8px 12px" }}
                        >
                          Choose Image File
                        </label>
                        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--ink-soft)" }}>
                          Supported file types: png, jpg, jpeg. Max size: 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
