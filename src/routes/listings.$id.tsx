import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Check, Star } from "lucide-react";
import { PageShell } from "@/components/shared/Navbar";
import { CompatibilityRing } from "@/components/matching/CompatibilityRing";
import { findListing, findUser, formatINR, mockReviews } from "@/lib/mock-data";

export const Route = createFileRoute("/listings/$id")({
  loader: ({ params }) => {
    const listing = findListing(params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.listing.title} — RoomieMatch` : "Listing" },
      { name: "description", content: loaderData?.listing.description },
      { property: "og:image", content: loaderData?.listing.photos[0] },
    ],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Listing not found</h2>
        <Link to="/listings" className="text-primary hover:underline mt-4 inline-block">Browse all listings →</Link>
      </div>
    </PageShell>
  ),
  component: ListingDetail,
});

function ListingDetail() {
  const { listing } = Route.useLoaderData();
  const [photo, setPhoto] = useState(0);
  const [interested, setInterested] = useState(false);
  const owner = findUser(listing.ownerId)!;

  const factors = [
    { label: "Shared interests", match: true, detail: "Gaming, Cooking, Fitness" },
    { label: "Both non-smokers", match: true },
    { label: "Budget overlap", match: true },
    { label: "Similar sleep schedule", match: false, detail: "Partial match" },
  ];

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 pb-32 md:pb-12">
        {/* Gallery */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-muted">
          <img src={listing.photos[photo]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {listing.photos.map((p: string, i: number) => (
            <button key={i} onClick={() => setPhoto(i)} className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden ring-2 transition-all ${i === photo ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100"}`}>
              <img src={p} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="mt-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{listing.title}</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-4 h-4" /> {listing.locality}, {listing.city}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">{listing.flatType}</span>
              <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">{listing.furnished}</span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> Available {listing.available}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">{formatINR(listing.rent)}</p>
            <p className="text-xs text-muted-foreground">/ person / month</p>
            <p className="text-xs text-muted-foreground mt-1">{formatINR(listing.deposit)} deposit</p>
          </div>
        </div>

        {/* Compatibility */}
        <div className="mt-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-50/40 p-6 md:p-8">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="mx-auto"><CompatibilityRing score={listing.matchScore} size={140} stroke={10} /></div>
            <div>
              <h2 className="text-xl font-bold">Why you're a great match</h2>
              <div className="mt-4 space-y-3">
                {factors.map((f, i) => (
                  <motion.div key={f.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.match ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                      {f.match ? <Check className="w-3 h-3" /> : "~"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{f.label}</p>
                      {f.detail && <p className="text-xs text-muted-foreground">{f.detail}</p>}
                      <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: f.match ? "92%" : "55%" }} transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }} className={`h-full ${f.match ? "bg-emerald-500" : "bg-amber-500"}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <section className="mt-8">
          <h2 className="text-xl font-bold">About this place</h2>
          <p className="mt-3 text-muted-foreground">{listing.description}</p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {[
              ["Flat type", listing.flatType], ["Furnished", listing.furnished],
              ["Rent", formatINR(listing.rent)], ["Deposit", formatINR(listing.deposit)],
              ["Available", listing.available], ["Preferred age", `${listing.ageRange[0]}–${listing.ageRange[1]}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="font-medium mt-0.5">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((a: string) => <span key={a} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{a}</span>)}
            </div>
          </div>
        </section>

        {/* Owner */}
        <section className="mt-8 rounded-3xl border border-border p-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Listed by</p>
          <div className="mt-3 flex items-center gap-4">
            <img src={owner.avatar} className="w-16 h-16 rounded-full" alt="" />
            <div className="flex-1">
              <p className="font-semibold">{owner.name}</p>
              <p className="text-sm text-muted-foreground">{owner.occupation} · Member since {owner.memberSince}</p>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{owner.rating}</span>
                <span className="text-muted-foreground">({owner.reviewsCount} reviews)</span>
              </div>
            </div>
            <Link to="/profile/$id" params={{ id: owner.id }} className="px-4 py-2 rounded-xl border border-border hover:border-primary/40 hover:bg-muted text-sm font-medium transition-all">View profile</Link>
          </div>

          <div className="mt-6 space-y-3">
            {mockReviews.slice(0, 2).map((r) => {
              const rev = findUser(r.reviewerId)!;
              return (
                <div key={r.id} className="rounded-2xl bg-muted/30 p-4">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} className="w-9 h-9 rounded-full" alt="" />
                    <div>
                      <p className="text-sm font-medium">{rev.name}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                    <div className="ml-auto flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-20 md:bottom-6 inset-x-4 md:inset-x-0 md:flex md:justify-center z-30">
        <div className="md:max-w-md md:w-full glass border border-border shadow-xl rounded-2xl p-2 flex gap-2">
          <Link to="/messages" className="flex-1 h-11 rounded-xl border border-border hover:bg-muted flex items-center justify-center text-sm font-medium transition-all">Message</Link>
          <button
            onClick={() => setInterested(true)}
            className={`flex-1 h-11 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${interested ? "bg-emerald-500 text-white" : "gradient-primary text-primary-foreground shadow-sm hover:shadow-glow"}`}
          >
            {interested ? <><Check className="w-4 h-4" /> Interest sent</> : <><Heart className="w-4 h-4" /> Express Interest</>}
          </button>
        </div>
      </div>
    </PageShell>
  );
}