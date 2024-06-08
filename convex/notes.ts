import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createNotes = mutation({
  args: {
    title: v.string(),
    body: v.string(),
  },
  async handler(ctx, args) {
    const userID = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userID) {
      throw new ConvexError("You must be logged in to create notes");
    }
    await ctx.db.insert("notes", {
      title: args.title,
      body: args.body,
      userID: userID,
    });
  },
});

export const listNotes = query({
  async handler(ctx) {
    const userID = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userID) {
      return [];
    }
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_userID", (x) => x.eq("userID", userID))
      .collect();
    return notes;
  },
});
