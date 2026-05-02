import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

export default function Navbar() {
  const { user, logoutUser } = useAuthStore();
  const { darkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "var(--tx2)",
    fontSize: "0.875rem",
    fontWeight: 500,
    padding: "6px 12px",
    borderRadius: 8,
    transition: "all 0.2s ease",
  };

  return (
    <nav
      className="glass"
      style={{ position: "sticky", top: 0, zIndex: 50 }}
    >
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30,
              background: "linear-gradient(135deg, var(--p), var(--sec))",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15,
            }}>🏠</div>
            <span className="grad-text" style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.03em" }}>
              Roomie Finder
            </span>
          </Link>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={toggleTheme}
              className="btn btn-ghost"
              style={{ width: 36, height: 36, padding: 0, borderRadius: "50%", fontSize: 16, border: "1.5px solid var(--bdr)" }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {user ? (
              <>
                <Link to="/create" className="btn btn-o" style={{ textDecoration: "none" }}>
                  + Post
                </Link>
                <Link to="/inbox" className="btn btn-ghost" style={{ textDecoration: "none", ...linkStyle }}>
                  Inbox
                </Link>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--p), var(--sec))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: "0 2px 8px var(--p-glow)",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost" style={{ fontSize: "0.875rem" }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-p" style={{ textDecoration: "none" }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}