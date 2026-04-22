import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Plus, Minus } from "lucide-react";
import { PageShell } from "@/components/shared/Navbar";

export const Route = createFileRoute("/listings/new")({
  head: () => ({ meta: [{ title: "Create listing — RoomieMatch" }] }),
  component: NewListing,
});

const sections = ["Type", "Location", "Room Details", "Preferences", "Photos", "Description"];

function NewListing() {
  const [active, setActive] = useState(0);
  const [rooms, setRooms] = useState(1);
  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 grid md:grid-cols-[220px_1fr] gap-8">
        <aside className="hidden md:block sticky top-24 self-start">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sections</p>
          <div className="space-y-1">
            {sections.map((s, i) => (
              <button key={s} onClick={() => setActive(i)} className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${active === i ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${i <= active ? "bg-primary" : "bg-muted-foreground/30"}`} />
                {s}
              </button>
            ))}
          </div>
        </aside>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create a new listing</h1>
          <p className="text-muted-foreground mt-1">Fill in the details to find your perfect match.</p>

          <div className="mt-8 rounded-3xl bg-card border border-border p-6 md:p-8 space-y-8">
            <Sec title="Listing Type">
              <div className="grid md:grid-cols-2 gap-3">
                <Choice title="I have a room in my flat" desc="Find someone to share with" />
                <Choice title="I'm looking for co-renters" desc="Team up to rent a new place" />
              </div>
            </Sec>

            <Sec title="Location">
              <div className="grid sm:grid-cols-2 gap-3">
                <input placeholder="City" defaultValue="Bengaluru" className="h-11 px-4 rounded-xl border border-border bg-background focus:border-primary outline-none transition-all" />
                <input placeholder="Locality / Area" className="h-11 px-4 rounded-xl border border-border bg-background focus:border-primary outline-none transition-all" />
                <input placeholder="PIN code" className="h-11 px-4 rounded-xl border border-border bg-background focus:border-primary outline-none transition-all" />
              </div>
            </Sec>

            <Sec title="Room Details">
              <div className="grid grid-cols-4 gap-2">
                {["1BHK", "2BHK", "3BHK", "Studio"].map((t) => <Choice key={t} title={t} compact />)}
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <Stepper label="Available rooms" value={rooms} onChange={setRooms} />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Rent per person</p>
                  <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span><input className="h-11 pl-8 pr-4 w-full rounded-xl border border-border bg-background focus:border-primary outline-none transition-all" defaultValue="12000" /></div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {["WiFi","AC","Parking","Geyser","Washing Machine","Lift","Power Backup"].map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-full bg-secondary border border-border text-sm cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all">{a}</span>
                  ))}
                </div>
              </div>
            </Sec>

            <Sec title="Photos">
              <div className="rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 p-10 text-center cursor-pointer transition-all">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                <p className="mt-3 font-medium">Drag photos or click to upload</p>
                <p className="text-xs text-muted-foreground">JPG or PNG · Up to 10 photos</p>
              </div>
            </Sec>

            <Sec title="Description">
              <textarea rows={4} placeholder="Tell potential roommates about your place..." className="w-full p-4 rounded-xl border border-border bg-background focus:border-primary outline-none transition-all resize-none" />
              <input type="date" className="mt-3 h-11 px-4 rounded-xl border border-border bg-background focus:border-primary outline-none transition-all" />
            </Sec>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-border font-medium text-sm hover:bg-muted transition-all">Save Draft</button>
            <button className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium text-sm shadow-sm hover:shadow-glow active:scale-95 transition-all">Publish Listing</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </section>
  );
}
function Choice({ title, desc, compact }: { title: string; desc?: string; compact?: boolean }) {
  const [sel, setSel] = useState(false);
  return (
    <button onClick={() => setSel(!sel)} className={`text-left rounded-2xl border-2 transition-all ${compact ? "p-3 text-sm font-medium" : "p-5"} ${sel ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
      <p className={compact ? "" : "font-semibold"}>{title}</p>
      {desc && <p className="text-xs text-muted-foreground mt-1">{desc}</p>}
    </button>
  );
}
function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(Math.max(1, value - 1))} className="w-9 h-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-all"><Minus className="w-3.5 h-3.5" /></button>
        <span className="w-12 text-center font-semibold">{value}</span>
        <button onClick={() => onChange(value + 1)} className="w-9 h-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-all"><Plus className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}