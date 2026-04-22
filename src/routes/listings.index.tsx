import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/shared/Navbar";
import { ListingCard } from "@/components/listing/ListingCard";
import { mockListings } from "@/lib/mock-data";

export const Route = createFileRoute("/listings/")({
  head: () => ({ meta: [{ title: "Browse listings — RoomieMatch" }] }),
  component: ListingsIndex,
});

function ListingsIndex() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All listings</h1>
            <p className="text-muted-foreground mt-1">{mockListings.length} rooms available across India</p>
          </div>
          <input className="h-10 px-4 rounded-xl border border-border bg-card outline-none focus:border-primary transition-all w-64" placeholder="Search city, locality..." />
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockListings.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
        </div>
      </div>
    </PageShell>
  );
}