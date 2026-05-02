import { databases, ID, DATABASE_ID, COL_FAVORITES } from "./appwrite";
import { Query } from "appwrite";

// Get user's favorites
export const getFavorites = async (userId) => {
  const res = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: COL_FAVORITES,
    queries: [Query.equal("userId", userId)],
  });
  return res.rows;
};

// Add favorite
export const addFavorite = async (userId, listingId) => {
  return await databases.createRow({
    databaseId: DATABASE_ID,
    tableId: COL_FAVORITES,
    rowId: ID.unique(),
    data: {
      userId,
      listingId,
    },
  });
};

// Remove favorite
export const removeFavorite = async (docId) => {
  return await databases.deleteRow({
    databaseId: DATABASE_ID,
    tableId: COL_FAVORITES,
    rowId: docId,
  });
};