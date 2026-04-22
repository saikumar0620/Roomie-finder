import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Share2, Heart } from "lucide-react";
import { PageShell } from "@/components/shared/Navbar";
import { CompatibilityRing } from "@/components/matching/CompatibilityRing";
import { findUser, mockReviews, mockListings } from "@/lib/mock-data";

export const Route = createFileRoute("/profile/$id")({
  loader: ({ params }) => {
    const user = findUser(params.id);
    if (!user) throw notFound();
    return { user };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.user.name} — RoomieMatch` : "Profile" }],
  }),
  notFoundComponent: () => (
    <PageShell><div className="max-w-2xl mx-auto py-20 text-center"><h2 className="text-2xl font-bold">Profile not found</h2><Link to="/feed" className="text-primary mt-3 inline-block hover:underline">Back to feed →</Link></div></PageShell>
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useLoaderData();
  const userListings = mockListings.filter((l) => l.ownerId === user.id);

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative mx-auto md:mx-0">
              <img src={user.avatar} className="w-32 h-32 rounded-full ring-4 ring-primary/10" alt={user.name} />
              {user.online && <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-card animate-pulse" />}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-muted-foreground">{user.age} · {user.gender} · {user.occupation}</p>
              <p className="text-sm text-muted-foreground mt-1">{user.city} · Member since {user.memberSince}</p>
              <div className="flex gap-2 mt-4 justify-center md:justify-start">
                <Link to="/messages" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium text-sm shadow-sm hover:shadow-glow active:scale-95 transition-all">
                  <Heart className="w-4 h-4" /> Send Interest
                </Link>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-all">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
            <CompatibilityRing score={user.matchScore} size={100} stroke={8} />
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-xl font-bold mb-3">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((i) => <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{i}</span>)}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold mb-3">Lifestyle</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(user.lifestyle).map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground capitalize">{k}</p>
                <p className="font-medium mt-0.5">{typeof v === "number" ? "★".repeat(v) : v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold mb-3">About as a roommate</h2>
          <div className="rounded-2xl bg-muted/40 p-5 italic text-muted-foreground">"{user.bio}"</div>
        </section>

        <section className="mt-6">
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-xl font-bold">Reviews</h2>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{user.rating}</span>
              <span className="text-sm text-muted-foreground">({user.reviewsCount})</span>
            </div>
            <Link to="/reviews/new/$id" params={{ id: user.id }} className="ml-auto text-sm text-primary font-medium hover:underline">Leave a review</Link>
          </div>
          <div className="space-y-3">
            {mockReviews.map((r) => {
              const rev = findUser(r.reviewerId)!;
              return (
                <div key={r.id} className="rounded-2xl border border-border p-5">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <p className="font-medium">{rev.name}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                    <div className="ml-auto flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                  </div>
                  <p className="mt-3 text-sm">{r.text}</p>
                  {r.liveAgain && <span className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">✓ Would live again</span>}
                </div>
              );
            })}
          </div>
        </section>

        {userListings.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-3">Active listings</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {userListings.map((l) => (
                <Link key={l.id} to="/listings/$id" params={{ id: l.id }} className="shrink-0 w-64 rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all">
                  <img src={l.photos[0]} className="w-full aspect-video object-cover" alt="" />
                  <div className="p-3">
                    <p className="font-medium text-sm truncate">{l.title}</p>
                    <p className="text-sm text-primary font-semibold">₹{l.rent.toLocaleString()}/mo</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}