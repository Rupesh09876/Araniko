import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  User,
  LogOut,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { authService } from "../../services/api";
import "../../styles/admin.css";

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser() || { email: "Admin" };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const getInitials = (email) => {
    return email ? email.substring(0, 2).toUpperCase() : "AD";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      to: "/admin/doctors",
      label: "Doctors",
      icon: <Users size={20} />,
    },
    {
      to: "/admin/news",
      label: "News",
      icon: <Megaphone size={20} />,
    },
    {
      to: "/admin/profile",
      label: "Profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Top Bar */}
      <div className="mobile-admin-bar">
        <button
          className="mobile-sidebar-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="sidebar-brand">
          <div className="sidebar-badge">
            <Plus size={18} strokeWidth={2.5} color="#fff" />
          </div>
          <span className="sidebar-title">Araniko Admin</span>
        </div>
        <div className="user-avatar">{getInitials(currentUser.email)}</div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/admin/dashboard" className="sidebar-brand" onClick={() => setMobileMenuOpen(false)}>
            <div className="sidebar-badge">
              <Plus size={20} strokeWidth={2.5} color="#fff" />
            </div>
            <div>
              <div className="sidebar-title">Araniko Hospital</div>
              <div className="sidebar-subtitle">Hospital Admin System</div>
            </div>
          </Link>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `menu-item${isActive ? " active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="admin-main">
        {/* Desktop Header */}
        <header className="admin-header">
          <div className="header-title">
            <h1>Admin Panel</h1>
          </div>
          <div className="admin-user-info">
            <div className="user-details">
              <div className="user-email">{currentUser.email}</div>
              <div className="user-role">Administrator</div>
            </div>
            <div className="user-avatar">{getInitials(currentUser.email)}</div>
          </div>
        </header>

        {/* Content Area */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
