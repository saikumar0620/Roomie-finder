import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/shared/Navbar";
import { ListingCard } from "@/components/listing/ListingCard";
import { CompatibilityRing } from "@/components/matching/CompatibilityRing";
import { mockListings, mockUsers, formatINR, matchBg } from "@/lib/mock-data";

export const Route = createFileRoute("/feed")({
  head: () => ({ meta: [{ title: "Your feed — RoomieMatch" }] }),
  component: FeedPage,
});

function FeedPage() {
  const [tab, setTab] = useState<"listings" | "people">("listings");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chips, setChips] = useState(["Bengaluru", "₹8k–15k", "Non-smoker"]);

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[260px_1fr_280px] gap-6">
        {/* Left sidebar */}
        <aside className="hidden lg:block space-y-4">
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/100?u=me" className="w-12 h-12 rounded-full" alt="" />
              <div>
                <p className="font-semibold">You</p>
                <p className="text-xs text-muted-foreground">Bengaluru · WFH</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Stat label="Matches" value="12" />
              <Stat label="Messages" value="4" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">Profile</span><span className="font-medium">75%</span></div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full gradient-primary" style={{ width: "75%" }} /></div>
              <Link to="/settings" className="text-xs text-primary font-medium hover:underline mt-2 inline-block">Complete your profile →</Link>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick links</p>
            <div className="mt-3 space-y-1">
              {[
                ["/interests", "Interests"],
                ["/messages", "Messages"],
                ["/listings/new", "Create listing"],
                ["/settings", "Settings"],
              ].map(([to, label]) => (
                <Link key={to} to={to} className="block px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div>
          <div className="sticky top-16 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 glass border-b border-border/50">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {chips.map((c) => (
                <span key={c} className="shrink-0 inline-flex items-center gap-1 pl-3 pr-1.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {c}
                  <button onClick={() => setChips(chips.filter((x) => x !== c))} className="w-4 h-4 rounded-full hover:bg-primary/20 flex items-center justify-center">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button onClick={() => setFiltersOpen(true)} className="ml-auto shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs font-medium hover:border-primary/40 hover:bg-muted transition-all">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-1 border-b border-border">
            {(["listings", "people"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t === "listings" ? "Room Listings" : "Roommate Profiles"}
                {tab === t && <motion.div layoutId="tab-underline" className="absolute -bottom-px inset-x-0 h-0.5 bg-primary" />}
              </button>
            ))}
          </div>

          {tab === "listings" ? (
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {mockListings.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
            </div>
          ) : (
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {mockUsers.map((u, i) => (
                <motion.div key={u.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to="/profile/$id" params={{ id: u.id }} className="block rounded-2xl border border-border bg-card p-6 text-center hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all">
                    <div className="relative inline-block">
                      <img src={u.avatar} alt={u.name} className="w-20 h-20 rounded-full mx-auto" />
                      {u.online && <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-card animate-pulse" />}
                    </div>
                    <h3 className="mt-3 font-semibold">{u.name}, {u.age}</h3>
                    <p className="text-xs text-muted-foreground">{u.occupation} · {u.city}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatINR(u.budget[0])}–{formatINR(u.budget[1])}</p>
                    <div className="mt-4 flex justify-center"><CompatibilityRing score={u.matchScore} size={88} stroke={6} glow={false} /></div>
                    <div className="mt-3 flex flex-wrap gap-1 justify-center">
                      {u.interests.slice(0, 3).map((i) => <span key={i} className="px-2 py-0.5 rounded-full bg-secondary text-xs">{i}</span>)}
                    </div>
                    <span className={`mt-4 inline-block px-3 py-1.5 rounded-xl text-xs font-medium border ${matchBg(u.matchScore)}`}>Connect</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right panel */}
        <aside className="hidden lg:block space-y-4">
          <div className="rounded-2xl bg-card border border-border p-5">
            <p className="font-semibold text-sm mb-3">Your recent matches</p>
            <div className="space-y-3">
              {mockUsers.slice(0, 3).map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <img src={u.avatar} className="w-10 h-10 rounded-full" alt="" />
                  <div className="flex-1 min-w-0">
                    <Link to="/profile/$id" params={{ id: u.id }} className="text-sm font-medium hover:text-primary truncate block">{u.name}</Link>
                    <p className="text-xs text-muted-foreground">{u.matchScore}% Match</p>
                  </div>
                  <Link to="/messages" className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl gradient-primary p-5 text-primary-foreground">
            <p className="font-semibold text-sm">Trending in Bengaluru</p>
            <p className="text-xs opacity-90 mt-1">3 new listings match your profile.</p>
            <Link to="/listings" className="mt-3 inline-block text-xs bg-white/20 backdrop-blur px-3 py-1.5 rounded-full font-medium hover:bg-white/30 transition-colors">Explore →</Link>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} className="fixed inset-0 bg-black/40 z-40" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28 }} className="fixed top-0 right-0 bottom-0 w-80 bg-card z-50 rounded-l-3xl shadow-xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-5">
                <Field label="City"><input className="w-full h-10 px-3 rounded-xl border border-border" defaultValue="Bengaluru" /></Field>
                <Field label="Budget (₹/month)">
                  <input type="range" min={2000} max={50000} className="w-full accent-primary" defaultValue={15000} />
                  <p className="text-xs text-muted-foreground mt-1">₹2,000 – ₹15,000</p>
                </Field>
                <Field label="Flat type">
                  <div className="flex flex-wrap gap-2">{["1BHK","2BHK","3BHK","Studio"].map(t => <span key={t} className="px-3 py-1 rounded-full bg-secondary text-xs">{t}</span>)}</div>
                </Field>
                <Field label="Lifestyle">
                  <div className="flex flex-wrap gap-2">{["Non-smoker","Pet friendly","WFH","Quiet"].map(t => <span key={t} className="px-3 py-1 rounded-full bg-secondary text-xs">{t}</span>)}</div>
                </Field>
              </div>
              <div className="mt-8 space-y-2">
                <button onClick={() => setFiltersOpen(false)} className="w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm">Apply Filters</button>
                <button className="w-full h-11 rounded-xl text-sm font-medium hover:bg-muted">Clear All</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/50 p-3 text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      {children}
    </div>
  );
}