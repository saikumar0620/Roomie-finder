import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { PageShell } from "@/components/shared/Navbar";
import { findUser } from "@/lib/mock-data";

export const Route = createFileRoute("/reviews/new/$id")({
  loader: ({ params }) => {
    const user = findUser(params.id);
    if (!user) throw notFound();
    return { user };
  },
  head: () => ({ meta: [{ title: "Write a review — RoomieMatch" }] }),
  notFoundComponent: () => <PageShell><div className="text-center py-20">User not found</div></PageShell>,
  component: NewReview,
});

function NewReview() {
  const { user } = Route.useLoaderData();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [liveAgain, setLiveAgain] = useState<boolean | null>(null);

  if (submitted) {
    return (
      <PageShell>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center"><Check className="w-10 h-10" /></div>
          <h2 className="text-2xl font-bold mt-6">Review submitted!</h2>
          <p className="text-muted-foreground mt-2">Thanks for sharing your experience.</p>
          <Link to="/profile/$id" params={{ id: user.id }} className="inline-block mt-6 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium">Back to profile</Link>
        </motion.div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
          <div className="flex items-center gap-4">
            <img src={user.avatar} className="w-14 h-14 rounded-full" alt="" />
            <div>
              <p className="text-sm text-muted-foreground">Rate your experience with</p>
              <p className="font-semibold text-lg">{user.name}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium mb-3">Overall rating</p>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map((n) => (
                <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)} className="active:scale-90 transition-transform">
                  <Star className={`w-10 h-10 transition-all ${n <= (hover || rating) ? "fill-amber-400 text-amber-400 scale-110" : "text-muted"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {["Cleanliness", "Communication", "Reliability", "Respect for space"].map((c) => <CategoryRow key={c} label={c} />)}
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium mb-2">Would you live with them again?</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setLiveAgain(true)} className={`h-11 rounded-xl border-2 font-medium transition-all ${liveAgain === true ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-border hover:border-primary/40"}`}>Yes 👍</button>
              <button onClick={() => setLiveAgain(false)} className={`h-11 rounded-xl border-2 font-medium transition-all ${liveAgain === false ? "border-destructive bg-destructive/10 text-destructive" : "border-border hover:border-primary/40"}`}>No 👎</button>
            </div>
          </div>

          <textarea rows={4} placeholder="Share your experience (optional)..." className="mt-6 w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-primary transition-all resize-none" />

          <button onClick={() => setSubmitted(true)} className="mt-6 w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-sm hover:shadow-glow active:scale-95 transition-all">
            Submit review
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function CategoryRow({ label }: { label: string }) {
  const [r, setR] = useState(0);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((n) => (
          <button key={n} onClick={() => setR(n)} className="active:scale-90 transition-transform">
            <Star className={`w-5 h-5 ${n <= r ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}