import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { mockUsers } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — RoomieMatch" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid md:grid-cols-[45%_1fr]">
      <div className="relative hidden md:flex flex-col justify-between p-12 gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 20%, white 0%, transparent 50%)" }} />
        <Link to="/" className="relative font-bold text-xl">RoomieMatch</Link>
        <div className="relative">
          <h2 className="text-4xl font-light leading-tight max-w-sm">"Your next home is more than four walls."</h2>
          <div className="mt-12 grid grid-cols-3 gap-3">
            {mockUsers.slice(0, 3).map((u, i) => (
              <motion.div key={u.id} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }} className="rounded-2xl bg-white/15 backdrop-blur-md p-3 border border-white/20">
                <img src={u.avatar} alt="" className="w-full aspect-square rounded-xl object-cover" />
                <p className="text-xs mt-2 font-medium truncate">{u.name.split(" ")[0]}</p>
                <p className="text-[10px] opacity-80">{u.matchScore}% Match</p>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="relative text-sm opacity-80">"Found my best friend through RoomieMatch." — Priya, Mumbai</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-2">New here? <Link to="/register" className="text-primary font-medium hover:underline">Create account</Link></p>

          <button className="mt-8 w-full h-11 rounded-xl border border-border bg-card font-medium text-sm hover:bg-muted active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.1 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or continue with email <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/feed" }); }} className="space-y-4">
            <input className="w-full h-11 px-4 rounded-xl border border-border bg-card focus:border-primary focus:shadow-glow outline-none transition-all text-sm" placeholder="Email" defaultValue="demo@roomiematch.app" />
            <div className="relative">
              <input type={show ? "text" : "password"} className="w-full h-11 px-4 pr-10 rounded-xl border border-border bg-card focus:border-primary focus:shadow-glow outline-none transition-all text-sm" placeholder="Password" defaultValue="demo1234" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <button type="button" className="text-xs text-primary font-medium hover:underline">Forgot password?</button>
            </div>
            <button type="submit" className="w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm hover:shadow-glow active:scale-[0.98] transition-all">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}