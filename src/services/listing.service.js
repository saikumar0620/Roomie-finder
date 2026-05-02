import { databases, storage, ID, DATABASE_ID, COL_LISTING, BUCKET_ID } from "./appwrite";
import { Query } from "appwrite";

// Upload multiple images
export const uploadImages = async (files) => {
 const uploaded = [];

for (let file of files) {
  const res = await storage.createFile(BUCKET_ID, ID.unique(), file);
  uploaded.push(res.$id); // store ONLY fileId
}

  return uploaded;
};

// Create listing
export const createListing = async (data) => {
  return await databases.createRow({
    databaseId: DATABASE_ID,
    tableId: COL_LISTING,
    rowId: ID.unique(),
    data
  });
};
export const getFilePreview = (fileId) => {
  return storage.getFilePreview(BUCKET_ID, fileId);
};

// Update listing
export const updateListing = async (id, data) => {
  return await databases.updateRow({
    databaseId: DATABASE_ID,
    tableId: COL_LISTING,
    rowId: id,
    data
  });
};

export const getUserListings = async (userId) => {
  const res = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: COL_LISTING,
    queries: [Query.equal("userId", userId)]
  });
  return res.rows;
};

// Delete listing
export const deleteListing = async (id) => {
  return await databases.deleteRow({
    databaseId: DATABASE_ID,
    tableId: COL_LISTING,
    rowId: id
  });
};

export const getListingById = async (id) => {
  return await databases.getRow({
    databaseId: DATABASE_ID,
    tableId: COL_LISTING,
    rowId: id
  });
};

export const getListings = async ({ pageParam = null, filters }) => {
  const limit = 6;

  const queries = [
    Query.limit(limit),
    Query.orderDesc("$createdAt"), // use built-in $createdAt — always indexed
  ];

  // Cursor-based pagination (Appwrite v25+)
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam));
  }

  if (filters?.minRent) {
    queries.push(Query.greaterThanEqual("rent", Number(filters.minRent)));
  }

  if (filters?.maxRent) {
    queries.push(Query.lessThanEqual("rent", Number(filters.maxRent)));
  }

  if (filters?.location) {
    queries.push(Query.search("location", filters.location));
  }

  if (filters?.preferences) {
    queries.push(Query.equal("preferences", filters.preferences));
  }

  const res = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: COL_LISTING,
    queries
  });

  // Return the $id of the last document as the cursor for the next page
  const lastDoc = res.rows[res.rows.length - 1];

  return {
    documents: res.rows,
    nextPage: res.rows.length === limit ? lastDoc.$id : undefined,
  };
};