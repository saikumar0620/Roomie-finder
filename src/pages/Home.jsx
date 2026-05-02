import { useState } from "react";
import { useListings } from "../hooks/useListings";
import ListingCard from "../components/ListingCard";
import Filters from "../components/Filters";
import ListingSkeleton from "../components/ListingSkeleton";

export default function Home() {
  const [filters, setFilters] = useState({});
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useListings(filters);

  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 60 }}>
      {/* Hero */}
      <div className="fade-up" style={{ textAlign: "center", marginBottom: 40 }}>
        <span className="badge" style={{ marginBottom: 12 }}>🏠 Find your perfect room</span>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "12px 0 8px" }}>
          Your next home, <span className="grad-text">waiting for you</span>
        </h1>
        <p style={{ color: "var(--tx2)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
          Browse verified roommate listings — filter by rent, location & preferences.
        </p>
      </div>

      {/* Filters */}
      <Filters onApply={setFilters} />

      {/* Error */}
      {isError && (
        <div style={{
          textAlign: "center", padding: "48px 24px",
          background: "var(--sur)", borderRadius: 16,
          border: "1px solid var(--bdr)",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          <p style={{ color: "var(--p)", fontWeight: 600, marginBottom: 6 }}>Failed to load listings</p>
          <p style={{ color: "var(--tx2)", fontSize: "0.875rem" }}>{error.message}</p>
          
          {(error?.code === 401 || error?.code === 403 || error?.message?.toLowerCase().includes("not authorized")) && (
            <div style={{ marginTop: 16, background: "rgba(245, 158, 11, 0.1)", padding: 16, borderRadius: 12, border: "1px solid rgba(245, 158, 11, 0.2)", color: "var(--tx2)", fontSize: "0.875rem" }}>
              <strong style={{ color: "var(--acc)", display: "block", marginBottom: 4 }}>Permissions Issue</strong>
              Go to Appwrite Console → Databases → <code>listing</code> collection → Settings → Permissions → Add <strong>Role: Any</strong> with <strong>Read</strong> access.
            </div>
          )}

          {error?.code === 400 && error?.message?.toLowerCase().includes("index") && (
            <div style={{ marginTop: 16, background: "rgba(245, 158, 11, 0.1)", padding: 16, borderRadius: 12, border: "1px solid rgba(245, 158, 11, 0.2)", color: "var(--tx2)", fontSize: "0.875rem", textAlign: "left" }}>
              <strong style={{ color: "var(--acc)", display: "block", marginBottom: 8, textAlign: "center" }}>Missing Indexes</strong>
              <div style={{ textAlign: "center", marginBottom: 8 }}>Appwrite requires indexes to use filters. Go to your Appwrite Console → Databases → <code>listing</code> collection → <strong>Indexes</strong> tab, and create these 3 indexes:</div>
              <ul style={{ margin: "0 auto", display: "inline-block", paddingLeft: 20 }}>
                <li style={{ marginBottom: 4 }}>Key: <code>rent_idx</code>, Type: <strong>Double</strong> (or Integer), Attributes: <code>rent</code></li>
                <li style={{ marginBottom: 4 }}>Key: <code>loc_idx</code>, Type: <strong>Fulltext</strong>, Attributes: <code>location</code></li>
                <li>Key: <code>pref_idx</code>, Type: <strong>Key</strong>, Attributes: <code>preferences</code></li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Skeleton grid */}
      {isLoading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {[...Array(6)].map((_, i) => <ListingSkeleton key={i} />)}
        </div>
      )}

      {/* Listings grid */}
      {!isLoading && !isError && (() => {
        const listings = data?.pages.flatMap(p => p.documents) ?? [];
        return (
          <>
            {listings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🏘️</div>
                <h2 style={{ fontSize: "1.25rem", marginBottom: 8 }}>No listings found</h2>
                <p style={{ color: "var(--tx2)", fontSize: "0.875rem" }}>
                  Try adjusting your filters or be the first to post a listing.
                </p>
              </div>
            ) : (
              <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
                {listings.map(l => <ListingCard key={l.$id} listing={l} />)}
              </div>
            )}

            {hasNextPage && (
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="btn btn-o"
                  style={{ minWidth: 160 }}
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        );
      })()}
    </div>
  );
}