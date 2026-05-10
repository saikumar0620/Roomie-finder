import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { getProfile, upsertProfile, uploadAvatar } from "../services/profile.service";
import { getFilePreview } from "../services/listing.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditProfile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [form, setForm] = useState({ bio: "", habits: "" });
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (user) {
      getProfile(user.$id).then(prof => {
        if (prof) {
          setProfileId(prof.$id);
          setForm({ bio: prof.bio || "", habits: prof.habits || "" });
          if (prof.avatarId) {
            setAvatarUrl(getFilePreview(prof.avatarId));
          }
        }
      });
    }
  }, [user]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalAvatarId = undefined;
      
      if (avatarFile) {
        toast.loading("Uploading avatar...");
        finalAvatarId = await uploadAvatar(avatarFile);
        toast.dismiss();
      }

      const data = {
        bio: form.bio,
        habits: form.habits,
      };

      if (finalAvatarId) {
        data.avatarId = finalAvatarId;
      }

      await upsertProfile(user.$id, data, profileId);
      toast.success("Profile saved successfully!");
      navigate("/profile");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to save profile. Make sure the profiles collection exists!");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (e) => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 480 }} className="fade-up">
        <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>Edit Profile</h1>
        <p style={{ color: "var(--tx2)", marginBottom: 32 }}>Tell potential roommates a bit about yourself.</p>

        <div style={{ background: "var(--sur)", border: "1px solid var(--bdr)", borderRadius: 20, padding: 32, boxShadow: "var(--sh2)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--p), var(--sec))",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "2rem", fontWeight: 700,
                backgroundImage: avatarUrl ? `url(${avatarUrl})` : "none",
                backgroundSize: "cover", backgroundPosition: "center",
                flexShrink: 0,
              }}>
                {!avatarUrl && (user?.name?.charAt(0).toUpperCase() || "U")}
              </div>
              
              <div>
                <input type="file" accept="image/*" id="avatar" style={{ display: "none" }} onChange={handleAvatarSelect} />
                <label htmlFor="avatar" className="btn btn-o" style={{ cursor: "pointer", padding: "8px 16px", fontSize: "0.875rem" }}>
                  Change Photo
                </label>
              </div>
            </div>

            <div>
              <label className="lbl">About Me (Bio)</label>
              <textarea 
                className="inp" 
                placeholder="I'm a software engineer who loves cooking..." 
                value={form.bio} 
                onChange={set("bio")} 
                rows={4} 
              />
            </div>

            <div>
              <label className="lbl">Habits & Lifestyle</label>
              <input 
                className="inp" 
                placeholder="e.g., Non-smoker, Early Bird, Pet Friendly" 
                value={form.habits} 
                onChange={set("habits")} 
              />
              <p style={{ fontSize: "0.75rem", color: "var(--tx2)", marginTop: 6 }}>Separate with commas.</p>
            </div>

            <button type="submit" className="btn btn-p" disabled={loading} style={{ width: "100%", padding: "13px", marginTop: 8 }}>
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
