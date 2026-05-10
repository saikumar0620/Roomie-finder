import { databases, storage, ID, DATABASE_ID, BUCKET_ID, COL_PROFILES } from "./appwrite";
import { Query, Permission, Role } from "appwrite";

// Get a user's profile
export const getProfile = async (userId) => {
  if (!COL_PROFILES) return null;
  const res = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: COL_PROFILES,
    queries: [Query.equal("userId", userId)]
  });
  return res.rows[0] || null;
};

// Create or update profile
export const upsertProfile = async (userId, data, existingDocId) => {
  if (existingDocId) {
    return await databases.updateRow({
      databaseId: DATABASE_ID,
      tableId: COL_PROFILES,
      rowId: existingDocId,
      data
    });
  } else {
    return await databases.createRow({
      databaseId: DATABASE_ID,
      tableId: COL_PROFILES,
      rowId: ID.unique(),
      data: { ...data, userId },
      permissions: [
        Permission.read(Role.any()),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId))
      ]
    });
  }
};

// Upload an avatar image
export const uploadAvatar = async (file) => {
  const res = await storage.createFile({
    bucketId: BUCKET_ID,
    fileId: ID.unique(),
    file: file,
    permissions: [Permission.read(Role.any())]
  });
  return res.$id;
};
