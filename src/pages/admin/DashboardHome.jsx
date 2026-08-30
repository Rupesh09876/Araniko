import { useState, useEffect } from "react";
import { Users, Megaphone, User, Loader2, RefreshCw } from "lucide-react";
import { dashboardService } from "../../services/api";
import "../../styles/admin.css";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="center" style={{ padding: "40px" }}>
        <Loader2 size={32} className="animate-spin" color="var(--brand)" />
        <p style={{ marginTop: "12px", color: "var(--ink-soft)" }}>Loading dashboard statistics...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <div className="section-head-row" style={{ marginBottom: "24px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "24px", color: "var(--ink)" }}>Welcome to Araniko Admin</h2>
          <p style={{ color: "var(--ink-soft)", margin: "4px 0 0" }}>
            Here is a quick overview of your hospital administration system.
          </p>
        </div>
        <button className="btn btn-outline" onClick={fetchStats} style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && (
        <div className="login-alert error" style={{ marginBottom: "24px" }}>
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Doctors</h3>
            <p className="stat-val">{stats?.totalDoctors ?? 0}</p>
          </div>
          <div className="stat-icon brand">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Active News</h3>
            <p className="stat-val">{stats?.activeNews ?? 0}</p>
          </div>
          <div className="stat-icon teal">
            <Megaphone size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Total News Announcements</h3>
            <p className="stat-val">{stats?.totalNews ?? 0}</p>
          </div>
          <div className="stat-icon leaf">
            <Megaphone size={24} />
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="panel-card" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px" }}>Chairman Profile Info</h2>
        {stats?.profile ? (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="stat-icon brand" style={{ borderRadius: "8px" }}>
              <User size={24} />
            </div>
            <div>
              <div style={{ fontWeight: "600", color: "var(--ink)" }}>{stats.profile.name}</div>
              <div style={{ fontSize: "14px", color: "var(--ink-soft)" }}>{stats.profile.title}</div>
            </div>
          </div>
        ) : (
          <p style={{ color: "var(--ink-soft)", margin: 0 }}>No profile details seeded. Go to Profile page to configure.</p>
        )}
      </div>
    </div>
  );
}
