import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { PageShell } from "@/components/shared/Navbar";
import { CompatibilityRing } from "@/components/matching/CompatibilityRing";
import { mockInterests, findUser, findListing } from "@/lib/mock-data";

export const Route = createFileRoute("/interests")({
  head: () => ({ meta: [{ title: "Interests — RoomieMatch" }] }),
  component: InterestsPage,
});

function InterestsPage() {
  const [tab, setTab] = useState<"received" | "sent">("received");
  const [items, setItems] = useState(mockInterests);
  const visible = items.filter((i) => i.type === tab);
  const [activeId, setActiveId] = useState(visible[0]?.id);
  const active = items.find((i) => i.id === activeId);

  const decline = (id: string) => setItems(items.filter((i) => i.id !== id));
  const accept = (id: string) => setItems(items.map((i) => i.id === id ? { ...i, status: "matched" } : i));

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <h1 className="text-3xl font-bold tracking-tight">Interests</h1>
        <div className="mt-4 flex gap-1 border-b border-border">
          {(["received", "sent"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`relative px-4 py-2.5 text-sm font-medium capitalize transition-colors ${tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {t}
              {tab === t && <motion.div layoutId="int-underline" className="absolute -bottom-px inset-x-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-[340px_1fr] gap-6">
          <div className="space-y-2">
            <AnimatePresence>
              {visible.map((it) => {
                const u = findUser(it.userId)!;
                const sel = it.id === activeId;
                return (
                  <motion.button
                    key={it.id}
                    layout
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => setActiveId(it.id)}
                    className={`w-full text-left flex gap-3 p-4 rounded-2xl border transition-all ${sel ? "bg-muted border-primary" : "border-border hover:border-primary/40 hover:bg-muted/50"}`}
                  >
                    <img src={u.avatar} className="w-12 h-12 rounded-full" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.occupation} · {u.city}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{it.time} ago</p>
                    </div>
                    <span className="text-xs font-bold text-primary">{u.matchScore}%</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
            {visible.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">No {tab} interests</p>
              </div>
            )}
          </div>

          {active && (() => {
            const u = findUser(active.userId)!;
            const l = active.listingId ? findListing(active.listingId) : null;
            return (
              <motion.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <img src={u.avatar} className="w-16 h-16 rounded-full" alt="" />
                  <div className="flex-1">
                    <Link to="/profile/$id" params={{ id: u.id }} className="font-semibold hover:text-primary">{u.name}, {u.age}</Link>
                    <p className="text-sm text-muted-foreground">{u.occupation} · {u.city}</p>
                  </div>
                  <CompatibilityRing score={u.matchScore} size={72} stroke={6} glow={false} />
                </div>
                {l && (
                  <Link to="/listings/$id" params={{ id: l.id }} className="mt-5 flex gap-3 rounded-2xl border border-border p-3 hover:border-primary/40 transition-all">
                    <img src={l.photos[0]} className="w-20 h-20 rounded-xl object-cover" alt="" />
                    <div>
                      <p className="font-medium text-sm">{l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.locality}</p>
                      <p className="text-sm font-semibold text-primary mt-1">₹{l.rent.toLocaleString()}/mo</p>
                    </div>
                  </Link>
                )}
                {active.status === "matched" ? (
                  <div className="mt-6 rounded-2xl bg-emerald-50 text-emerald-700 p-4 text-center font-medium flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> Matched! <Link to="/messages" className="underline">Start chatting →</Link>
                  </div>
                ) : tab === "received" ? (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button onClick={() => accept(active.id)} className="h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm hover:shadow-glow active:scale-95 transition-all">Accept</button>
                    <button onClick={() => decline(active.id)} className="h-11 rounded-xl border border-destructive/40 text-destructive font-medium hover:bg-destructive/5 active:scale-95 transition-all flex items-center justify-center gap-2"><X className="w-4 h-4" /> Decline</button>
                  </div>
                ) : (
                  <p className="mt-6 text-center text-sm text-muted-foreground">Waiting for response...</p>
                )}
              </motion.div>
            );
          })()}
        </div>
      </div>
    </PageShell>
  );
}