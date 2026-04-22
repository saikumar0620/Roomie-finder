import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Star, User2, Home as HomeIcon, Sun, Moon, Zap } from "lucide-react";
import { interestPool } from "@/lib/mock-data";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Set up your profile — RoomieMatch" }] }),
  component: Onboarding,
});

const TOTAL = 5;
const stepTitles = ["Basic info", "Your role", "Budget", "Interests", "Lifestyle"];

function Onboarding() {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>(["Cooking", "Reading"]);
  const [role, setRole] = useState<string | null>(null);
  const [gender, setGender] = useState("Female");
  const [budget, setBudget] = useState<[number, number]>([8000, 15000]);
  const [sleep, setSleep] = useState("Early Bird");
  const [cleanliness, setCleanliness] = useState(4);
  const navigate = useNavigate();

  const next = () => (step < TOTAL ? setStep(step + 1) : navigate({ to: "/feed" }));
  const back = () => step > 1 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 inset-x-0 z-50 h-1 bg-muted">
        <motion.div className="h-full gradient-primary" animate={{ width: `${(step / TOTAL) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <div className="max-w-2xl mx-auto pt-16 pb-12 px-4">
        <p className="text-xs text-muted-foreground text-center font-medium">Step {step} of {TOTAL} · {stepTitles[step - 1]}</p>

        <div className="mt-6 rounded-3xl bg-card border border-border shadow-lg p-6 md:p-10 min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold tracking-tight">Let's set up your profile</h2>
                  <input className="w-full h-11 px-4 rounded-xl border border-border bg-background outline-none focus:border-primary focus:shadow-glow transition-all" placeholder="Full name" defaultValue="Demo User" />
                  <input type="number" className="w-full h-11 px-4 rounded-xl border border-border bg-background outline-none focus:border-primary focus:shadow-glow transition-all" placeholder="Age" defaultValue={26} />
                  <div>
                    <p className="text-sm font-medium mb-2">Gender</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Male", "Female", "Non-binary"].map((g) => (
                        <button key={g} onClick={() => setGender(g)} className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all ${gender === g ? "border-primary bg-primary/5 text-primary scale-[1.02]" : "border-border hover:border-primary/40"}`}>
                          <User2 className="w-5 h-5 mx-auto mb-1" />
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input className="w-full h-11 px-4 rounded-xl border border-border bg-background outline-none focus:border-primary transition-all" placeholder="Occupation" />
                  <input className="w-full h-11 px-4 rounded-xl border border-border bg-background outline-none focus:border-primary transition-all" placeholder="City" defaultValue="Bengaluru" />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold tracking-tight">How are you using RoomieMatch?</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { id: "seeker", title: "I need a place", desc: "Find a room or co-renters", icon: User2 },
                      { id: "owner", title: "I have a room", desc: "Find the right person to share", icon: HomeIcon },
                    ].map((c) => (
                      <button key={c.id} onClick={() => setRole(c.id)} className={`text-left p-6 rounded-2xl border-2 h-44 transition-all ${role === c.id ? "border-primary bg-primary/5 scale-[1.02] shadow-md" : "border-border hover:border-primary/40 hover:shadow-sm"}`}>
                        <c.icon className="w-7 h-7 text-primary mb-3" />
                        <p className="font-semibold">{c.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">You can switch or add the other option later</p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">What's your budget?</h2>
                  <p className="text-2xl font-bold text-primary">₹{budget[0].toLocaleString()} — ₹{budget[1].toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Minimum</label>
                      <input type="range" min={2000} max={50000} step={500} value={budget[0]} onChange={(e) => setBudget([+e.target.value, budget[1]])} className="w-full accent-primary" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Maximum</label>
                      <input type="range" min={2000} max={50000} step={500} value={budget[1]} onChange={(e) => setBudget([budget[0], +e.target.value])} className="w-full accent-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred move-in date</label>
                    <input type="date" className="mt-2 w-full h-11 px-4 rounded-xl border border-border bg-background outline-none focus:border-primary transition-all" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">What are you into?</h2>
                    <span className="text-sm text-primary font-semibold">{interests.length} selected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">This powers your compatibility score</p>
                  <div className="flex flex-wrap gap-2">
                    {interestPool.map((tag) => {
                      const sel = interests.includes(tag);
                      return (
                        <motion.button
                          key={tag} whileTap={{ scale: 0.94 }}
                          onClick={() => setInterests(sel ? interests.filter((t) => t !== tag) : [...interests, tag])}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${sel ? "bg-primary text-primary-foreground border-primary shadow-sm scale-[1.03]" : "bg-secondary border-border hover:border-primary/40 hover:bg-primary/5"}`}
                        >
                          {tag}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">How do you live?</h2>
                  <div>
                    <p className="text-sm font-medium mb-2">Sleep schedule</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ k: "Early Bird", i: Sun }, { k: "Night Owl", i: Moon }, { k: "Flexible", i: Zap }].map((o) => (
                        <button key={o.k} onClick={() => setSleep(o.k)} className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${sleep === o.k ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"}`}>
                          <o.i className="w-4 h-4 mx-auto mb-1" />
                          {o.k}
                        </button>
                      ))}
                    </div>
                  </div>
                  {[
                    { label: "Smoking", opts: ["Non-smoker", "Occasionally", "Yes"] },
                    { label: "Drinking", opts: ["Non-drinker", "Occasionally", "Yes"] },
                    { label: "Guests", opts: ["Often", "Sometimes", "Rarely"] },
                  ].map((g) => (
                    <Segmented key={g.label} label={g.label} opts={g.opts} />
                  ))}
                  <div>
                    <p className="text-sm font-medium mb-2">Cleanliness</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((n) => (
                        <button key={n} onClick={() => setCleanliness(n)} className="active:scale-90 transition-transform">
                          <Star className={`w-7 h-7 ${n <= cleanliness ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between items-center">
            <button onClick={back} disabled={step === 1} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted disabled:opacity-30 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm hover:shadow-glow active:scale-95 transition-all">
              {step === TOTAL ? <>Finish <Check className="w-4 h-4" /></> : <>Continue <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Segmented({ label, opts }: { label: string; opts: string[] }) {
  const [val, setVal] = useState(opts[0]);
  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {opts.map((o) => (
          <button key={o} onClick={() => setVal(o)} className={`p-2.5 rounded-xl border-2 text-sm font-medium transition-all ${val === o ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}