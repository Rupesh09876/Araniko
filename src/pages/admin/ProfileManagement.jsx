import { useState, useEffect } from "react";
import { Upload, Loader2, Save } from "lucide-react";
import { profileService } from "../../services/api";
import "../../styles/admin.css";

export default function ProfileManagement() {
  const [chairmanName, setChairmanName] = useState("");
  const [chairmanTitle, setChairmanTitle] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "") : "http://localhost:5001";

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await profileService.get();
      if (data) {
        setChairmanName(data.chairmanName || "");
        setChairmanTitle(data.chairmanTitle || "");
        setImagePreview(
          data.chairmanImage
            ? (data.chairmanImage.startsWith("http") ? data.chairmanImage : `${backendUrl}${data.chairmanImage}`)
            : ""
        );
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch chairman profile details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chairmanName || !chairmanTitle) {
      showToast("Chairman name and title are required.", false);
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("chairman_name", chairmanName);
    formData.append("chairman_title", chairmanTitle);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const result = await profileService.update(formData);
      showToast("Chairman profile updated successfully.");
      // update preview path with the returned value
      if (result.profile && result.profile.chairmanImage) {
        const imgPath = result.profile.chairmanImage;
        setImagePreview(imgPath.startsWith("http") ? imgPath : `${backendUrl}${imgPath}`);
      }
      setImageFile(null);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to update profile details.", false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-management">
      {/* Toast Notifications */}
      <div className="notification-container">
        {success && <div className="toast success">{success}</div>}
        {error && <div className="toast error">{error}</div>}
      </div>

      <div className="section-head-row" style={{ marginBottom: "24px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "24px", color: "var(--ink)" }}>Chairman Profile</h2>
          <p style={{ color: "var(--ink-soft)", margin: "4px 0 0" }}>
            Update the Chairman's information rendered in the public About section.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="center" style={{ padding: "40px" }}>
          <Loader2 size={32} className="animate-spin" color="var(--brand)" />
          <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading profile information...</p>
        </div>
      ) : (
        <div className="panel-card" style={{ maxWidth: "680px" }}>
          <div className="panel-header">
            <h2>Edit Chairman Details</h2>
          </div>
          <div style={{ padding: "24px" }}>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label>Chairman Name *</label>
                <input
                  type="text"
                  className="form-control-input"
                  style={{ paddingLeft: "16px" }}
                  value={chairmanName}
                  onChange={(e) => setChairmanName(e.target.value)}
                  placeholder="e.g. Raj Kumar Pomoo Limbu"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label>Chairman Title *</label>
                <input
                  type="text"
                  className="form-control-input"
                  style={{ paddingLeft: "16px" }}
                  value={chairmanTitle}
                  onChange={(e) => setChairmanTitle(e.target.value)}
                  placeholder="e.g. Chairman, Araniko Hospital"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "28px" }}>
                <label>Chairman Profile Image</label>
                <div className="image-preview-container">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Chairman"
                      className="image-preview"
                      style={{ width: "90px", height: "90px", borderRadius: "8px" }}
                    />
                  ) : (
                    <div className="image-preview-placeholder" style={{ width: "90px", height: "90px" }}>
                      <Upload size={24} />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="chairman-image-file"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="chairman-image-file"
                      className="btn btn-outline"
                      style={{ cursor: "pointer", display: "inline-block", fontSize: "14px", padding: "8px 12px" }}
                    >
                      Choose Profile Image
                    </label>
                    <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--ink-soft)" }}>
                      Recommended: square ratio image. Max size: 5MB
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving Details...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save Profile Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
