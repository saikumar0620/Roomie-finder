import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/shared/Navbar";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — RoomieMatch" }] }),
  component: Settings,
});

const sections = ["Profile", "Preferences", "Listings", "Notifications", "Privacy", "Account"];

function Settings() {
  const [active, setActive] = useState("Profile");
  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 grid md:grid-cols-[220px_1fr] gap-8">
        <aside>
          <h1 className="text-xl font-bold mb-4">Settings</h1>
          <div className="space-y-1">
            {sections.map((s) => (
              <button key={s} onClick={() => setActive(s)} className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${active === s ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                {s}
              </button>
            ))}
          </div>
        </aside>

        <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight">{active}</h2>

          {active === "Profile" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?u=me" className="w-20 h-20 rounded-full" alt="" />
                <button className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted">Change photo</button>
              </div>
              <input className="w-full h-11 px-4 rounded-xl border border-border" defaultValue="Demo User" />
              <input className="w-full h-11 px-4 rounded-xl border border-border" defaultValue="demo@roomiematch.app" />
              <input className="w-full h-11 px-4 rounded-xl border border-border" defaultValue="Bengaluru" />
            </div>
          )}

          {active === "Notifications" && (
            <div className="mt-6 space-y-3">
              {["New matches", "Messages", "Interest received", "Weekly digest", "Marketing"].map((n) => <Toggle key={n} label={n} />)}
            </div>
          )}

          {active === "Privacy" && (
            <div className="mt-6 space-y-3">
              <Toggle label="Show my profile in feed" />
              <Toggle label="Allow messages from non-matches" />
              <Toggle label="Show online status" />
            </div>
          )}

          {active === "Account" && (
            <div className="mt-6 space-y-3">
              <button className="w-full h-11 rounded-xl border border-border text-left px-4 text-sm font-medium hover:bg-muted">Change password</button>
              <button className="w-full h-11 rounded-xl border border-border text-left px-4 text-sm font-medium hover:bg-muted">Export my data</button>
              <button className="w-full h-11 rounded-xl border border-destructive/40 text-destructive text-left px-4 text-sm font-medium hover:bg-destructive/5">Delete account</button>
            </div>
          )}

          {(active === "Preferences" || active === "Listings") && (
            <p className="text-sm text-muted-foreground mt-6">Manage your {active.toLowerCase()} here.</p>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function Toggle({ label }: { label: string }) {
  const [on, setOn] = useState(true);
  return (
    <div className="rounded-2xl bg-muted/40 p-4 flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <button onClick={() => setOn(!on)} className={`w-11 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-primary" : "bg-muted-foreground/30"}`}>
        <span className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}