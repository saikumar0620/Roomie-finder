import { useQuery } from "@tanstack/react-query";
import { getRoommatesWanted } from "../services/profile.service";
import { getFilePreview } from "../services/listing.service";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { getOrCreateConversation } from "../services/chat.service";

export default function Roommates() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["roommates"],
    queryFn: getRoommatesWanted,
  });

  const handleContact = async (targetUserId) => {
    if (!user) { navigate("/login"); return; }
    try {
      const convo = await getOrCreateConversation(user.$id, targetUserId);
      navigate(`/chat/${convo.$id}`);
    } catch {
      // Contact failed silently — user stays on page
    }
  };

  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 60 }}>
      {/* Hero */}
      <div className="fade-up" style={{ textAlign: "center", marginBottom: 40 }}>
        <span className="badge" style={{ marginBottom: 12 }}>🙋‍♂️ Find a Roommate</span>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "12px 0 8px" }}>
          Looking for a place to stay
        </h1>
        <p style={{ color: "var(--tx2)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
          Have an extra room? Browse through people who are actively looking for a roommate.
        </p>
      </div>

      {isLoading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skel" style={{ height: 280, borderRadius: 20 }} />
          ))}
        </div>
      )}

      {!isLoading && profiles.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🦗</div>
          <h2 style={{ fontSize: "1.25rem", marginBottom: 8 }}>No one is looking right now</h2>
          <p style={{ color: "var(--tx2)", fontSize: "0.875rem" }}>
            Check back later to see if anyone needs a room.
          </p>
        </div>
      )}

      <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
        {profiles.map(prof => (
          <div key={prof.$id} className="card" style={{ padding: 24, textAlign: "center", display: "flex", flexDirection: "column" }}>
            <div style={{
              width: 90, height: 90, borderRadius: "50%", margin: "0 auto 16px",
              background: "linear-gradient(135deg, var(--p), var(--sec))",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "2rem", fontWeight: 700,
              backgroundImage: prof.avatarId ? `url(${getFilePreview(prof.avatarId)})` : "none",
              backgroundSize: "cover", backgroundPosition: "center",
            }}>
              {!prof.avatarId && "U"}
            </div>
            
            <h3 style={{ margin: "0 0 12px", fontSize: "1.25rem", fontWeight: 700, color: "var(--tx)" }}>
              {prof.name ? prof.name : `Roommate ${prof.userId.slice(-4)}`}
            </h3>

            {prof.habits && (
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 16 }}>
                {prof.habits.split(",").map(h => h.trim()).filter(Boolean).map(habit => (
                  <span key={habit} className="tag" style={{ fontSize: "0.75rem", padding: "4px 8px" }}>
                    {habit}
                  </span>
                ))}
              </div>
            )}

            {prof.bio && (
              <p style={{ fontSize: "0.875rem", color: "var(--tx2)", margin: "0 0 20px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                "{prof.bio}"
              </p>
            )}

            <div style={{ marginTop: "auto" }}>
              {user?.$id !== prof.userId ? (
                <button 
                  onClick={() => handleContact(prof.userId)} 
                  className="btn btn-p" 
                  style={{ width: "100%", padding: "10px", fontSize: "0.875rem" }}
                >
                  💬 Message
                </button>
              ) : (
                <button disabled className="btn btn-o" style={{ width: "100%", padding: "10px", fontSize: "0.875rem", opacity: 0.5 }}>
                  This is you
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
