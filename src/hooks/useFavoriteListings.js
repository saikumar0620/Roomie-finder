import { useQuery } from "@tanstack/react-query";
import { getListingById } from "../services/listing.service";
import { useFavorites } from "./useFavorites";

export const useFavoriteListings = () => {
  const { favorites } = useFavorites();

  return useQuery({
    queryKey: ["favoriteListings", favorites.map((f) => f.listingId)],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      const promises = favorites.map(async (f) => {
        try {
          return await getListingById(f.listingId);
        } catch {
          // If a listing is deleted, it might throw an error.
          return null;
        }
      });
      const listings = await Promise.all(promises);
      return listings.filter(Boolean); // Filter out nulls
    },
    enabled: favorites.length > 0,
    initialData: [], // Default to empty array if no favorites
  });
};
