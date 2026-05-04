import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserListings } from "../hooks/useUserListings";
import { useFavoriteListings } from "../hooks/useFavoriteListings";
import { useFavorites } from "../hooks/useFavorites";
import { deleteListing } from "../services/listing.service";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuthStore();
  const { data: listings = [], refetch } = useUserListings();
  const { data: favoriteListings = [] } = useFavoriteListings();
  const { removeFavorite, favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState("listings");
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Delete this listing?")) return;
    setLoadingId(id);
    try {
      await deleteListing(id);
      toast.success("Listing deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="wrap fade-up" style={{ paddingTop: 40, paddingBottom: 60 }}>
      {/* Profile card */}
      <div style={{
        display: "flex", alignItems: "center", gap: 20,
        background: "var(--sur)", border: "1px solid var(--bdr)",
        borderRadius: 20, padding: "28px 32px", marginBottom: 40,
        boxShadow: "var(--sh2)",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--p), var(--sec))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: "1.5rem", fontWeight: 700,
          boxShadow: "0 4px 16px var(--p-glow)", flexShrink: 0,
        }}>
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "1.375rem", margin: "0 0 4px" }}>{user?.name}</h1>
          <p style={{ color: "var(--tx2)", fontSize: "0.875rem", margin: 0 }}>{user?.email}</p>
        </div>
        <Link to="/create" className="btn btn-p" style={{ textDecoration: "none" }}>
          + Post Room
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, borderBottom: "1px solid var(--bdr)" }}>
        <button
          onClick={() => setActiveTab("listings")}
          style={{
            background: "none", border: "none", padding: "12px 16px",
            fontSize: "1rem", fontWeight: activeTab === "listings" ? 600 : 500,
            color: activeTab === "listings" ? "var(--p)" : "var(--tx2)",
            borderBottom: activeTab === "listings" ? "2px solid var(--p)" : "2px solid transparent",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8
          }}
        >
          My Listings
          <span style={{
            background: activeTab === "listings" ? "var(--p)" : "var(--bdr)",
            color: activeTab === "listings" ? "#fff" : "var(--tx2)",
            padding: "2px 8px", borderRadius: 12, fontSize: "0.75rem"
          }}>{listings.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          style={{
            background: "none", border: "none", padding: "12px 16px",
            fontSize: "1rem", fontWeight: activeTab === "favorites" ? 600 : 500,
            color: activeTab === "favorites" ? "var(--p)" : "var(--tx2)",
            borderBottom: activeTab === "favorites" ? "2px solid var(--p)" : "2px solid transparent",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8
          }}
        >
          Favorites
          <span style={{
            background: activeTab === "favorites" ? "var(--p)" : "var(--bdr)",
            color: activeTab === "favorites" ? "#fff" : "var(--tx2)",
            padding: "2px 8px", borderRadius: 12, fontSize: "0.75rem"
          }}>{favoriteListings.length}</span>
        </button>
      </div>

      {activeTab === "listings" && (
        <>
          {listings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 24px", background: "var(--sur)", borderRadius: 16, border: "1px solid var(--bdr)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
              <p style={{ color: "var(--tx2)", fontSize: "0.9375rem" }}>You haven't posted any listings yet.</p>
              <Link to="/create" className="btn btn-p" style={{ textDecoration: "none", marginTop: 16, display: "inline-flex" }}>
                Post your first room
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {listings.map(l => (
                <div key={l.$id} className="card" style={{ padding: 0 }}>
                  <div style={{ padding: "20px 20px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <h3 style={{ fontSize: "1rem", margin: 0, flex: 1, paddingRight: 8 }}>{l.title}</h3>
                      <span className="badge">₹{Number(l.rent).toLocaleString()}</span>
                    </div>
                    <p style={{ color: "var(--tx2)", fontSize: "0.8125rem", margin: "4px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                      📍 {l.location}
                    </p>
                  </div>
                  <div className="divider" style={{ margin: 0 }} />
                  <div style={{ padding: "12px 20px 16px", display: "flex", gap: 10 }}>
                    <Link to={`/edit/${l.$id}`} className="btn btn-o" style={{ textDecoration: "none", flex: 1, justifyContent: "center" }}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(l.$id)}
                      disabled={loadingId === l.$id}
                      className="btn"
                      style={{
                        flex: 1, background: "rgba(225,29,72,0.08)", color: "var(--p)",
                        border: "1.5px solid rgba(225,29,72,0.15)",
                      }}
                    >
                      {loadingId === l.$id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "favorites" && (
        <>
          {favoriteListings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 24px", background: "var(--sur)", borderRadius: 16, border: "1px solid var(--bdr)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
              <p style={{ color: "var(--tx2)", fontSize: "0.9375rem" }}>You haven't added any listings to your favorites.</p>
              <Link to="/" className="btn btn-p" style={{ textDecoration: "none", marginTop: 16, display: "inline-flex" }}>
                Browse rooms
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {favoriteListings.map(l => {
                // Find the favorite document ID to be able to remove it
                const favoriteDoc = favorites.find(f => f.listingId === l.$id);
                return (
                  <div key={l.$id} className="card" style={{ padding: 0 }}>
                    <div style={{ padding: "20px 20px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <h3 style={{ fontSize: "1rem", margin: 0, flex: 1, paddingRight: 8 }}>{l.title}</h3>
                        <span className="badge">₹{Number(l.rent).toLocaleString()}</span>
                      </div>
                      <p style={{ color: "var(--tx2)", fontSize: "0.8125rem", margin: "4px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
                        📍 {l.location}
                      </p>
                    </div>
                    <div className="divider" style={{ margin: 0 }} />
                    <div style={{ padding: "12px 20px 16px", display: "flex", gap: 10 }}>
                      <Link to={`/listing/${l.$id}`} className="btn btn-o" style={{ textDecoration: "none", flex: 1, justifyContent: "center" }}>
                        View
                      </Link>
                      <button
                        onClick={() => favoriteDoc && removeFavorite({ docId: favoriteDoc.$id })}
                        className="btn"
                        style={{
                          flex: 1, background: "rgba(225,29,72,0.08)", color: "var(--p)",
                          border: "1.5px solid rgba(225,29,72,0.15)",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}