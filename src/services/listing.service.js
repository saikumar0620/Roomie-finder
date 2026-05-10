import { databases, storage, ID, DATABASE_ID, COL_LISTING, BUCKET_ID } from "./appwrite";
import { Query, Permission, Role } from "appwrite";

// Upload multiple images
export const uploadImages = async (files) => {
 const uploaded = [];

for (let file of files) {
  const res = await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    file
  );
  uploaded.push(res.$id); // store ONLY fileId
}

  return uploaded;
};

// Create listing
export const createListing = async (data) => {
  return await databases.createDocument(
    DATABASE_ID,
    COL_LISTING,
    ID.unique(),
    data,
    [
      Permission.read(Role.any()),
      Permission.update(Role.user(data.userId)),
      Permission.delete(Role.user(data.userId)),
    ]
  );
};
export const getFilePreview = (fileId) => {
  return storage.getFilePreview(
    BUCKET_ID,
    fileId
  );
};

// Update listing
export const updateListing = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    COL_LISTING,
    id,
    data
  );
};

export const getUserListings = async (userId) => {
  const res = await databases.listDocuments(
    DATABASE_ID,
    COL_LISTING,
    [Query.equal("userId", userId)]
  );
  return res.documents;
};

// Delete listing
export const deleteListing = async (id) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    COL_LISTING,
    id
  );
};

export const getListingById = async (id) => {
  return await databases.getDocument(
    DATABASE_ID,
    COL_LISTING,
    id
  );
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

  const res = await databases.listDocuments(
    DATABASE_ID,
    COL_LISTING,
    queries
  );

  // Return the $id of the last document as the cursor for the next page
  const lastDoc = res.documents[res.documents.length - 1];

  return {
    documents: res.documents,
    nextPage: (res.documents.length === limit && lastDoc) ? lastDoc.$id : undefined,
  };
};