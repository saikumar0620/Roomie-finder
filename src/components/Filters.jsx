import { useState } from "react";

export default function Filters({ onApply }) {
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({ minRent, maxRent, location, preferences });
  };

  const handleReset = () => {
    setMinRent(""); setMaxRent(""); setLocation(""); setPreferences("");
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
    </form>
  );
}