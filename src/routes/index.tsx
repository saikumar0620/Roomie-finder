import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Shield, Heart, ArrowRight, Home, Users, MessageCircle } from "lucide-react";
import { CompatibilityRing } from "@/components/matching/CompatibilityRing";
import { mockUsers } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RoomieMatch — Find Your People. Find Your Place." },
      { name: "description", content: "Compatibility-first roommate matching. Real interests, lifestyle fit, verified reviews." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">RoomieMatch</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-xl transition-colors">Sign in</Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium gradient-primary text-primary-foreground rounded-xl shadow-sm hover:shadow-glow transition-all">Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              Compatibility-first roommate matching
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Find Your People.<br />
              <span className="bg-clip-text text-transparent gradient-primary">Find Your Place.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-muted-foreground max-w-md">
              Roommate matching based on real compatibility — shared interests, lifestyle, and verified reviews. Not just the cheapest room.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap gap-3">
              <Link to="/feed" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm hover:shadow-glow active:scale-95 transition-all">
                Find a Room <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/listings/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card font-medium hover:border-primary/40 hover:bg-muted active:scale-95 transition-all">
                List My Room
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Compatibility Matched</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Verified Reviews</span>
              <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /> Safe & Private</span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative animate-float">
            <div className="rounded-3xl bg-card border border-border shadow-xl p-6 max-w-sm mx-auto">
              <div className="flex items-center gap-4">
                <img src={mockUsers[0].avatar} className="w-16 h-16 rounded-full ring-4 ring-emerald-100" alt="" />
                <div className="flex-1">
                  <p className="font-semibold">{mockUsers[0].name}</p>
                  <p className="text-xs text-muted-foreground">{mockUsers[0].occupation} · {mockUsers[0].city}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center">
                <CompatibilityRing score={92} size={140} />
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                {mockUsers[0].interests.slice(0, 4).map((i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{i}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">How it works</h2>
        <p className="text-center text-muted-foreground mt-3">Three steps to your perfect roommate.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Users, title: "Build your profile", desc: "Tell us your interests, lifestyle, and what you're looking for." },
            { icon: Sparkles, title: "Get matched", desc: "Our compatibility engine surfaces people who actually fit." },
            { icon: MessageCircle, title: "Connect & move in", desc: "Chat, meet, and move in with confidence." },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-muted/40 border border-border p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-1">STEP {i + 1}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center text-primary-foreground">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 0%, transparent 50%)" }} />
          <h2 className="relative text-3xl md:text-4xl font-bold tracking-tight">Ready to find your match?</h2>
          <p className="relative mt-3 opacity-90">Join thousands of happy roommates.</p>
          <Link to="/register" className="relative inline-flex mt-6 items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-105 active:scale-95 transition-transform">
            Get started for free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">RoomieMatch</span>
          <div className="flex gap-5">
            <Link to="/feed" className="hover:text-foreground">Browse</Link>
            <Link to="/login" className="hover:text-foreground">Sign in</Link>
            <Link to="/settings" className="hover:text-foreground">Settings</Link>
          </div>
          <span>© 2026 RoomieMatch</span>
        </div>
      </footer>
    </div>
  );
}
