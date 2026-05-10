import { useConversations } from "../hooks/useConversations";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile.service";
import { getFilePreview } from "../services/listing.service";

function ConversationCard({ conversation, otherUserId, index }) {
  const { data: profile } = useQuery({
    queryKey: ["profile", otherUserId],
    queryFn: () => getProfile(otherUserId),
    enabled: !!otherUserId,
  });

  return (
    <Link
      to={`/chat/${conversation.$id}`}
      style={{ textDecoration: "none" }}
    >
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 20px",
          borderRadius: 14,
          animationDelay: `${index * 60}ms`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            flexShrink: 0,
            background: `linear-gradient(135deg, var(--p), var(--sec))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
            backgroundImage: profile?.avatarId ? `url(${getFilePreview(profile?.avatarId)})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {!profile?.avatarId && (profile?.bio ? "U" : "💬")}
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 500, color: "var(--tx)" }}>
            {profile?.bio ? "User" : "Conversation"}
          </p>

          <p style={{ margin: 0, fontSize: 12, color: "var(--tx2)" }}>
            User ID: {otherUserId}
          </p>
        </div>

        <span style={{ color: "var(--tx3)" }}>›</span>
      </div>
    </Link>
  );
}

export default function Inbox() {
  const { user } = useAuthStore();
  const { data = [], isLoading, isError, error } = useConversations(user?.$id);

  return (
    <div className="wrap fade-up" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 640 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title">Inbox</h1>
        <p className="section-sub">{data.length} conversation{data.length !== 1 ? "s" : ""}</p>
      </div>

      {isError && error?.code === 400 && (
        <div style={{ marginBottom: 24, background: "rgba(245, 158, 11, 0.1)", padding: 20, borderRadius: 16, border: "1px solid rgba(245, 158, 11, 0.2)", color: "var(--tx2)", fontSize: "0.875rem" }}>
          <strong style={{ color: "var(--acc)", display: "block", marginBottom: 8, fontSize: "1rem" }}>Missing Indexes in Appwrite</strong>
          To view your inbox, go to Appwrite Console → Databases → <code>conversations</code> table → <strong>Indexes</strong> tab, and resolve the following error:
          <div style={{ marginTop: 8, padding: 12, background: "rgba(255,255,255,0.5)", borderRadius: 8, color: "#b91c1c", fontWeight: 500, fontFamily: "monospace" }}>
            {error.message}
          </div>
        </div>
      )}

      {isLoading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: 20, background: "var(--sur)", borderRadius: 16, border: "1px solid var(--bdr)" }}>
              <div className="skel" style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="skel" style={{ height: 14, width: "60%", marginBottom: 8 }} />
                <div className="skel" style={{ height: 12, width: "40%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && data.length === 0 && (
        <div style={{ textAlign: "center", padding: "64px 24px", background: "var(--sur)", borderRadius: 20, border: "1px solid var(--bdr)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <h2 style={{ fontSize: "1.125rem", marginBottom: 8 }}>No messages yet</h2>
          <p style={{ color: "var(--tx2)", fontSize: "0.875rem" }}>Start a conversation by contacting a listing owner.</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((c, i) => {
          const otherUser = c.user1Id === user.$id ? c.user2Id : c.user1Id;
          return <ConversationCard key={c.$id} conversation={c} otherUserId={otherUser} index={i} />;
        })}
      </div>
    </div>
  );
}