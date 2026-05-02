import { useState, useEffect } from "react";
import { createListing, updateListing, getListingById, uploadImages } from "../services/listing.service";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Field = ({ label, children }) => (
  <div>
    <label className="lbl">{label}</label>
    {children}
  </div>
);

export default function CreateListing() {
  const { listingId } = useParams();
  const isEdit = !!listingId;
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({ title: "", rent: "", location: "", description: "", preferences: "" });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getListingById(listingId).then(data => {
        setForm({ title: data.title || "", rent: data.rent || "", location: data.location || "", description: data.description || "", preferences: data.preferences || "" });
      });
    }
  }, [isEdit, listingId]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.rent || !form.location) { toast.error("Fill required fields"); return; }
    setLoading(true);
    try {
      let imageUrls = form.images || [];
      if (files.length > 0) {
        toast.loading("Uploading images...");
        imageUrls = await uploadImages(files);
        toast.dismiss();
      }
      const data = { 
        title: form.title, 
        rent: Number(form.rent), 
        location: form.location, 
        userId: user.$id 
      };
      if (form.description) data.description = form.description;
      if (form.preferences) data.preferences = form.preferences;
      if (imageUrls.length > 0) data.images = imageUrls;
      if (isEdit) {
        await updateListing(listingId, data);
        toast.success("Listing updated");
      } else {
        await createListing(data);
        toast.success("Listing created!");
      }
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["myListings"] });
      navigate("/");
    } catch (err) {
      toast.dismiss();
      if (err?.code === 401 || err?.code === 403) {
        toast.error("Appwrite Permission Denied! Go to Appwrite Console → listing table → Settings → Permissions and add 'Users' with 'Create' access.", { duration: 8000 });
      } else if (err?.code === 400) {
        toast.error(`Appwrite Error: ${err.message}`, { duration: 10000 });
      } else {
        toast.error(isEdit ? "Failed to update" : "Failed to create listing");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 560 }} className="fade-up">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <span className="badge" style={{ marginBottom: 12 }}>{isEdit ? "✏️ Edit" : "🏠 New listing"}</span>
          <h1 style={{ fontSize: "1.75rem", margin: 0 }}>{isEdit ? "Edit Listing" : "Post a Room"}</h1>
          <p style={{ color: "var(--tx2)", marginTop: 6, fontSize: "0.875rem" }}>
            {isEdit ? "Update your listing details below." : "Fill in the details to find your perfect roommate."}
          </p>
        </div>

        <div style={{ background: "var(--sur)", border: "1px solid var(--bdr)", borderRadius: 20, padding: 32, boxShadow: "var(--sh2)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Field label="Title *">
              <input className="inp" placeholder="e.g. Cozy 1BHK near Metro" value={form.title} onChange={set("title")} />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Monthly Rent (₹) *">
                <input type="number" className="inp" placeholder="e.g. 8000" value={form.rent} onChange={set("rent")} />
              </Field>
              <Field label="Preference">
                <select className="inp" value={form.preferences} onChange={set("preferences")} style={{ appearance: "none", cursor: "pointer" }}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Any</option>
                </select>
              </Field>
            </div>

            <Field label="Location *">
              <input className="inp" placeholder="e.g. Koramangala, Bangalore" value={form.location} onChange={set("location")} />
            </Field>

            <Field label="Description">
              <textarea className="inp" placeholder="Describe the room, amenities, house rules..." value={form.description} onChange={set("description")} rows={4} style={{ resize: "vertical", lineHeight: 1.6 }} />
            </Field>

            <Field label="Photos">
              <div style={{
                border: "2px dashed var(--bdr)", borderRadius: 12, padding: "24px",
                textAlign: "center", cursor: "pointer", transition: "border-color 0.2s ease",
                background: "var(--sur2)",
                marginBottom: files.length > 0 ? 12 : 0
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--p)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bdr)"; }}
              >
                <input type="file" multiple accept="image/*" onChange={e => setFiles(Array.from(e.target.files))} style={{ display: "none" }} id="photos" />
                <label htmlFor="photos" style={{ cursor: "pointer", display: "block" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
                  <p style={{ color: "var(--tx2)", fontSize: "0.875rem", margin: 0 }}>
                    {files.length > 0 ? "Click to change photos" : "Click to upload photos"}
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 12, marginTop: 12 }}>
                  {files.map((file, i) => (
                    <div key={i} style={{ position: "relative", paddingTop: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid var(--bdr)", boxShadow: "var(--sh1)" }}>
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="preview" 
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                      <button 
                        type="button"
                        onClick={() => setFiles(files.filter((_, index) => index !== i))}
                        style={{
                          position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", color: "white",
                          border: "none", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", fontSize: 10, backdropFilter: "blur(4px)"
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Field>

            <button type="submit" className="btn btn-p" disabled={loading} style={{ width: "100%", padding: "13px", marginTop: 4, fontSize: "0.9375rem" }}>
              {loading ? "Saving..." : (isEdit ? "Update Listing" : "Post Listing")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}