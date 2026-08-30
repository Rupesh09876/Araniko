import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload, Loader2 } from "lucide-react";
import { doctorService, departmentService } from "../../services/api";
import "../../styles/admin.css";

export default function DoctorsManagement() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const backendUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "") : "http://localhost:5001";

  const fetchDoctorsAndDepts = async () => {
    setLoading(true);
    try {
      const doctorsData = await doctorService.getAll();
      const deptsData = await departmentService.getAll();
      setDoctors(doctorsData);
      setDepartments(deptsData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctors and departments records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsAndDepts();
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
    setSelectedDoctorId(null);
    setName("");
    setSpecialization("");
    setDepartmentId("");
    setQualification("");
    setExperience("");
    setBio("");
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setIsEditing(true);
    setSelectedDoctorId(doc.id);
    setName(doc.name || "");
    setSpecialization(doc.specialization || "");
    setDepartmentId(doc.departmentId || "");
    setQualification(doc.qualification || "");
    setExperience(doc.experience || "");
    setBio(doc.bio || "");
    setImageFile(null);
    setImagePreview(doc.image ? (doc.image.startsWith("http") ? doc.image : `${backendUrl}${doc.image}`) : "");
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id, docName) => {
    if (window.confirm(`Are you sure you want to delete ${docName}?`)) {
      try {
        await doctorService.delete(id);
        showToast("Doctor record deleted successfully.");
        fetchDoctorsAndDepts();
      } catch (err) {
        console.error(err);
        showToast("Failed to delete doctor.", false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !specialization) {
      showToast("Name and specialization are required.", false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("specialization", specialization);
    formData.append("department_id", departmentId);
    formData.append("qualification", qualification);
    formData.append("experience", experience);
    formData.append("bio", bio);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (isEditing) {
        await doctorService.update(selectedDoctorId, formData);
        showToast("Doctor details updated successfully.");
      } else {
        await doctorService.create(formData);
        showToast("New doctor profile created successfully.");
      }
      setModalOpen(false);
      fetchDoctorsAndDepts();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save doctor details.", false);
    }
  };

  return (
    <div className="doctors-management">
      {/* Toast Notifications */}
      <div className="notification-container">
        {success && <div className="toast success">{success}</div>}
        {error && <div className="toast error">{error}</div>}
      </div>

      <div className="section-head-row" style={{ marginBottom: "24px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "24px", color: "var(--ink)" }}>Manage Doctors</h2>
          <p style={{ color: "var(--ink-soft)", margin: "4px 0 0" }}>
            Add, update, and manage doctor records here.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      {loading ? (
        <div className="center" style={{ padding: "40px" }}>
          <Loader2 size={32} className="animate-spin" color="var(--brand)" />
          <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading doctors registry...</p>
        </div>
      ) : (
        <div className="panel-card">
          <div className="panel-header">
            <h2>Doctors List</h2>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Doctor Details</th>
                  <th>Department</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlignment: "center", color: "var(--ink-soft)", padding: "32px" }}>
                      No doctors available in the registry.
                    </td>
                  </tr>
                ) : (
                  doctors.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div className="table-doc-info">
                          {doc.image ? (
                            <img
                              src={doc.image.startsWith("http") ? doc.image : `${backendUrl}${doc.image}`}
                              alt={doc.name}
                              className="table-doc-thumb"
                            />
                          ) : (
                            <div className="table-doc-initials">
                              {doc.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: "600", color: "var(--ink)" }}>{doc.name}</div>
                            <div style={{ fontSize: "12px", color: "var(--ink-soft)" }}>{doc.qualification}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge success">{doc.department?.name || "None"}</span>
                      </td>
                      <td>{doc.specialization}</td>
                      <td>{doc.experience || "N/A"}</td>
                      <td>
                        <div className="table-actions">
                          <button className="btn-icon" onClick={() => handleOpenEdit(doc)} title="Edit doctor details">
                            <Edit2 size={14} />
                          </button>
                          <button className="btn-icon delete" onClick={() => handleDelete(doc.id, doc.name)} title="Remove doctor profile">
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

      {/* Add / Edit Doctor Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{isEditing ? "Edit Doctor Profile" : "Add New Doctor"}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "contents" }}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group-full">
                    <label>Doctor Name *</label>
                    <input
                      type="text"
                      className="form-control-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Sandip Adhikari"
                      required
                    />
                  </div>

                  <div>
                    <label>Specialization *</label>
                    <input
                      type="text"
                      className="form-control-input"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="e.g. Orthopedic Surgeon"
                      required
                    />
                  </div>

                  <div>
                    <label>Department</label>
                    <select
                      className="form-control-select"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label>Experience (Years / Shift)</label>
                    <input
                      type="text"
                      className="form-control-input"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 5+ Years / Mon to Fri"
                    />
                  </div>

                  <div>
                    <label>Qualification</label>
                    <input
                      type="text"
                      className="form-control-input"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      placeholder="e.g. MBBS, MS (Orthopedics)"
                    />
                  </div>

                  <div className="form-group-full">
                    <label>Doctor Biography / Details</label>
                    <textarea
                      className="form-control-textarea"
                      rows="3"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Write brief description about doctor's expertise and path."
                    />
                  </div>

                  <div className="form-group-full">
                    <label>Profile Image</label>
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
                          id="doctor-image-file"
                          onChange={handleImageChange}
                        />
                        <label
                          htmlFor="doctor-image-file"
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
