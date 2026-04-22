import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { type MockListing, formatINR, matchBg } from "@/lib/mock-data";

export function ListingCard({ listing, index = 0 }: { listing: MockListing; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to="/listings/$id"
        params={{ id: listing.id }}
        className="group block rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-300"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={listing.photos[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms]"
          />
          <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${matchBg(listing.matchScore)}`}>
            {listing.matchScore}% Match
          </span>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {listing.locality}, {listing.city}
            </div>
            <h3 className="font-semibold mt-1 truncate">{listing.title}</h3>
            <p className="text-sm text-muted-foreground">{listing.flatType} · {listing.furnished}</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-primary">{formatINR(listing.rent)}</span>
            <span className="text-xs text-muted-foreground">/month</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {listing.tags.slice(0, 3).map((t) => (
              <span key={t} className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1 border-t border-border">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{listing.rating}</span>
            <span>({listing.reviews} reviews)</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}