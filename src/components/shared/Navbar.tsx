import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, MessageCircle, Heart, Search, Plus, Home, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { mockNotifications, findUser } from "@/lib/mock-data";

const navLinks = [
  { to: "/feed", label: "Feed" },
  { to: "/listings", label: "Listings" },
  { to: "/messages", label: "Messages" },
  { to: "/interests", label: "Interests" },
] as const;

export function Navbar() {
  const [openNotif, setOpenNotif] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const unreadNotif = mockNotifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-40 hidden md:block glass border-b border-border/60">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">RoomieMatch</span>
            <span className="text-primary font-bold">·</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((l) => {
              const active = path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-glow"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => { setOpenNotif(!openNotif); setOpenProfile(false); }}
                className="relative w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-all active:scale-90"
              >
                <Bell className="w-5 h-5" />
                {unreadNotif > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                )}
              </button>
              {openNotif && <NotificationsPanel onClose={() => setOpenNotif(false)} />}
            </div>
            <div className="relative">
              <button
                onClick={() => { setOpenProfile(!openProfile); setOpenNotif(false); }}
                className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-primary/40 transition-all active:scale-95"
              >
                <img src="https://i.pravatar.cc/100?u=me" alt="me" className="w-full h-full object-cover" />
              </button>
              {openProfile && <ProfileMenu onClose={() => setOpenProfile(false)} />}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border/60 rounded-t-3xl px-4 py-2">
        <div className="flex items-center justify-around">
          <MobileTab to="/feed" icon={<Home className="w-5 h-5" />} label="Home" />
          <MobileTab to="/listings" icon={<Search className="w-5 h-5" />} label="Search" />
          <Link to="/listings/new" className="-mt-6 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow active:scale-90 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </Link>
          <MobileTab to="/messages" icon={<MessageCircle className="w-5 h-5" />} label="Chat" />
          <MobileTab to="/profile/u1" icon={<User className="w-5 h-5" />} label="Profile" />
        </div>
      </nav>
    </>
  );
}

function MobileTab({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = path.startsWith(to);
  return (
    <Link to={to} className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-all ${active ? "text-primary scale-110" : "text-muted-foreground"}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card shadow-xl z-50 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          <button className="text-xs text-primary font-medium hover:underline">Mark all read</button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {mockNotifications.map((n) => {
            const u = findUser(n.userId);
            const accent = n.type === "match" ? "border-l-emerald-500" : n.type === "message" ? "border-l-primary" : n.type === "review" ? "border-l-amber-500" : "border-l-primary";
            return (
              <div key={n.id} className={`flex gap-3 px-4 py-3 border-l-2 ${accent} hover:bg-muted/50 transition-colors ${n.unread ? "bg-primary/5" : ""}`}>
                <img src={u?.avatar} className="w-9 h-9 rounded-full" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time} ago</p>
                </div>
                {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

function ProfileMenu({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-xl z-50 overflow-hidden"
      >
        {[
          { to: "/profile/u1", label: "My Profile" },
          { to: "/listings/new", label: "Create Listing" },
          { to: "/settings", label: "Settings" },
          { to: "/onboarding", label: "Onboarding" },
          { to: "/", label: "Sign out" },
        ].map((i) => (
          <Link key={i.to + i.label} to={i.to} onClick={onClose} className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors">
            {i.label}
          </Link>
        ))}
      </motion.div>
    </>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pb-24 md:pb-12"
      >
        {children}
      </motion.main>
    </div>
  );
}

export { Heart };