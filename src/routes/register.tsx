import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — RoomieMatch" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const strength = Math.min(100, pw.length * 12 + (/\d/.test(pw) ? 15 : 0) + (/[A-Z]/.test(pw) ? 15 : 0));
  const color = strength < 40 ? "bg-red-500" : strength < 70 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className="min-h-screen grid md:grid-cols-[45%_1fr]">
      <div className="relative hidden md:flex flex-col justify-center p-12 gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 70% 80%, white 0%, transparent 50%)" }} />
        <Link to="/" className="relative font-bold text-xl absolute top-12 left-12">RoomieMatch</Link>
        <div className="relative">
          <h2 className="text-4xl font-light leading-tight max-w-sm">Join 10,000+ people who found their perfect roommate.</h2>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-2">Already have one? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link></p>

          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/onboarding" }); }} className="mt-8 space-y-4">
            <input className="w-full h-11 px-4 rounded-xl border border-border bg-card focus:border-primary focus:shadow-glow outline-none transition-all text-sm" placeholder="Full name" />
            <input className="w-full h-11 px-4 rounded-xl border border-border bg-card focus:border-primary focus:shadow-glow outline-none transition-all text-sm" placeholder="Email" />
            <div>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full h-11 px-4 rounded-xl border border-border bg-card focus:border-primary focus:shadow-glow outline-none transition-all text-sm" placeholder="Password" />
              <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                <div className={`h-full transition-all duration-300 ${color}`} style={{ width: `${strength}%` }} />
              </div>
            </div>
            <input type="password" className="w-full h-11 px-4 rounded-xl border border-border bg-card focus:border-primary focus:shadow-glow outline-none transition-all text-sm" placeholder="Confirm password" />
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-primary" />
              <span>I agree to the <a className="text-primary hover:underline">Terms</a> and <a className="text-primary hover:underline">Privacy Policy</a></span>
            </label>
            <button type="submit" className="w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm hover:shadow-glow active:scale-[0.98] transition-all">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}