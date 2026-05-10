import { useState } from "react";

export default function Filters({ onApply }) {
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState("");
  const [amenities, setAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({ minRent, maxRent, location, preferences, amenities });
  };

  const handleReset = () => {
    setMinRent(""); setMaxRent(""); setLocation(""); setPreferences(""); setAmenities([]);
    onApply({});
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "var(--sur)",
      border: "1px solid var(--bdr)",
      borderRadius: 16,
      padding: "20px 24px",
      marginBottom: 32,
      boxShadow: "var(--sh1)",
    }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
        <div style={{ flex: "1 1 130px", minWidth: 130 }}>
          <label className="lbl">Min Rent (₹)</label>
          <input
            type="number" placeholder="0"
            className="inp"
            value={minRent}
            onChange={e => setMinRent(e.target.value)}
          />
        </div>

        <div style={{ flex: "1 1 130px", minWidth: 130 }}>
          <label className="lbl">Max Rent (₹)</label>
          <input
            type="number" placeholder="Any"
            className="inp"
            value={maxRent}
            onChange={e => setMaxRent(e.target.value)}
          />
        </div>

        <div style={{ flex: "2 1 180px", minWidth: 180 }}>
          <label className="lbl">Location</label>
          <input
            placeholder="City or area..."
            className="inp"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <div style={{ flex: "1 1 150px", minWidth: 150 }}>
          <label className="lbl">Preference</label>
          <select
            className="inp"
            value={preferences}
            onChange={e => setPreferences(e.target.value)}
            style={{ appearance: "none", cursor: "pointer" }}
          >
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">No preference</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 8, paddingBottom: 0 }}>
          <button type="submit" className="btn btn-p">
            Search
          </button>
          <button type="button" className="btn btn-o" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <label className="lbl" style={{ marginBottom: 8, display: "block" }}>Amenities</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["WiFi", "AC", "Gym", "Parking", "Attached Washroom"].map(amenity => (
            <label key={amenity} style={{
              display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", cursor: "pointer",
              background: amenities.includes(amenity) ? "var(--p-light, rgba(79, 70, 229, 0.1))" : "var(--sur2)",
              color: amenities.includes(amenity) ? "var(--p)" : "var(--tx2)",
              border: `1px solid ${amenities.includes(amenity) ? "var(--p)" : "var(--bdr)"}`,
              padding: "6px 12px", borderRadius: 20, transition: "all 0.2s"
            }}>
              <input 
                type="checkbox" 
                style={{ display: "none" }}
                checked={amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)} 
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}