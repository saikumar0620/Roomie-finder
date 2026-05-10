import { databases, ID, DATABASE_ID, COL_CONVERSATIONS, COL_MESSAGES } from "./appwrite";
import { Query } from "appwrite";

// Create or get conversation
export const getOrCreateConversation = async (
  userId,
  otherUserId,
  listingId
) => {
  const res = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: COL_CONVERSATIONS,
    queries: [
      Query.equal("listingId", listingId),
      Query.or([
        Query.and([Query.equal("user1Id", userId), Query.equal("user2Id", otherUserId)]),
        Query.and([Query.equal("user1Id", otherUserId), Query.equal("user2Id", userId)])
      ])
    ],
  });

  if (res.rows.length > 0) {
    return res.rows[0];
  }

  return await databases.createRow({
    databaseId: DATABASE_ID,
    tableId: COL_CONVERSATIONS,
    rowId: ID.unique(),
    data: {
      user1Id: userId,
      user2Id: otherUserId,
      listingId,
    },
  });
};

// Send message
export const sendMessage = async (conversationId, senderId, text) => {
  return await databases.createRow({
    databaseId: DATABASE_ID,
    tableId: COL_MESSAGES,
    rowId: ID.unique(),
    data: {
      conversationId,
      senderId,
      text,
    },
  });
};

// Get messages
export const getMessages = async (conversationId) => {
  const res = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: COL_MESSAGES,
    queries: [
      Query.equal("conversationId", conversationId),
      Query.orderAsc("$createdAt"),
    ],
  });

  return res.rows;
};

// Get user conversations
export const getUserConversations = async (userId) => {
  const res = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: COL_CONVERSATIONS,
    queries: [
      Query.or([
        Query.equal("user1Id", userId),
        Query.equal("user2Id", userId),
      ]),
      Query.orderDesc("$createdAt"),
    ],
  });

  return res.rows;
};