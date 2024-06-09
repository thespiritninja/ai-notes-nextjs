import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    body: v.string(),
    title: v.string(),
    userID: v.string(),
    fileID: v.string(),
  }).index("by_userID", ["userID"]),
});
